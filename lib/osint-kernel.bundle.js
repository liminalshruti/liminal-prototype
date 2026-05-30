// ../liminal-test/src/correction/log.ts
class InMemoryEventLog {
  events = [];
  append(event) {
    this.events.push(Object.freeze({ ...event }));
  }
  all() {
    return this.events;
  }
  byCase(caseId) {
    return this.events.filter((e) => ("caseId" in e) && e.caseId === caseId);
  }
}

// ../liminal-test/src/lib/ipc.ts
var _log = new InMemoryEventLog;
function setEventLog(log) {
  _log = log;
}
function invoke(command, args) {
  switch (command) {
    case "append_event":
      _log.append(args);
      return { ok: true };
    case "get_events":
      return _log.all();
    case "get_case_events":
      return _log.byCase(args.caseId);
    default:
      throw new Error(`unrouted command: ${command}`);
  }
}

// ../liminal-test/src/scoring/matrix.ts
var EPSILON = 0.000000000001;
function assertFiniteNumber(value, label) {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number`);
  }
}
function assertVector(vector, label = "vector") {
  if (!Array.isArray(vector) || vector.length === 0) {
    throw new Error(`${label} must be a non-empty vector`);
  }
  vector.forEach((value, index) => assertFiniteNumber(value, `${label}[${index}]`));
}
function assertMatrix(matrix, label = "matrix") {
  if (!Array.isArray(matrix) || matrix.length === 0 || matrix[0].length === 0) {
    throw new Error(`${label} must be a non-empty matrix`);
  }
  const columns = matrix[0].length;
  matrix.forEach((row, rowIndex) => {
    if (!Array.isArray(row) || row.length !== columns) {
      throw new Error(`${label} must be rectangular`);
    }
    row.forEach((value, columnIndex) => {
      assertFiniteNumber(value, `${label}[${rowIndex}][${columnIndex}]`);
    });
  });
}
function zeros(rows, columns) {
  if (!Number.isInteger(rows) || rows <= 0 || !Number.isInteger(columns) || columns <= 0) {
    throw new Error("Matrix dimensions must be positive integers");
  }
  return Array.from({ length: rows }, () => Array.from({ length: columns }, () => 0));
}
function identity(size) {
  if (!Number.isInteger(size) || size <= 0) {
    throw new Error("Identity matrix size must be a positive integer");
  }
  const matrix = zeros(size, size);
  for (let index = 0;index < size; index += 1) {
    matrix[index][index] = 1;
  }
  return matrix;
}
function transpose(matrix) {
  assertMatrix(matrix);
  const rows = matrix.length;
  const columns = matrix[0].length;
  const result = zeros(columns, rows);
  for (let row = 0;row < rows; row += 1) {
    for (let column = 0;column < columns; column += 1) {
      result[column][row] = matrix[row][column];
    }
  }
  return result;
}
function add(a, b) {
  assertSameShape(a, b, "add");
  return a.map((row, rowIndex) => row.map((value, columnIndex) => value + b[rowIndex][columnIndex]));
}
function subtract(a, b) {
  assertSameShape(a, b, "subtract");
  return a.map((row, rowIndex) => row.map((value, columnIndex) => value - b[rowIndex][columnIndex]));
}
function multiply(a, b) {
  assertMatrix(a, "left matrix");
  assertMatrix(b, "right matrix");
  if (a[0].length !== b.length) {
    throw new Error(`Cannot multiply ${a.length}x${a[0].length} by ${b.length}x${b[0].length}`);
  }
  const result = zeros(a.length, b[0].length);
  for (let row = 0;row < a.length; row += 1) {
    for (let column = 0;column < b[0].length; column += 1) {
      let total = 0;
      for (let inner = 0;inner < a[0].length; inner += 1) {
        total += a[row][inner] * b[inner][column];
      }
      result[row][column] = total;
    }
  }
  return result;
}
function multiplyMatrixVector(matrix, vector) {
  assertMatrix(matrix);
  assertVector(vector);
  if (matrix[0].length !== vector.length) {
    throw new Error(`Cannot multiply ${matrix.length}x${matrix[0].length} matrix by ${vector.length} vector`);
  }
  return matrix.map((row) => dot(row, vector));
}
function dot(a, b) {
  assertVector(a, "left vector");
  assertVector(b, "right vector");
  if (a.length !== b.length) {
    throw new Error("Vector dimensions must match");
  }
  return a.reduce((total, value, index) => total + value * b[index], 0);
}
function inverse2(matrix) {
  assertMatrix(matrix);
  if (matrix.length !== 2 || matrix[0].length !== 2) {
    throw new Error("inverse2 expects a 2x2 matrix");
  }
  const [[a, b], [c, d]] = matrix;
  const determinant = a * d - b * c;
  if (Math.abs(determinant) < EPSILON) {
    throw new Error("Matrix is singular and cannot be inverted");
  }
  return [
    [d / determinant, -b / determinant],
    [-c / determinant, a / determinant]
  ];
}
function eigenSymmetric2(matrix) {
  assertMatrix(matrix);
  if (matrix.length !== 2 || matrix[0].length !== 2) {
    throw new Error("eigenSymmetric2 expects a 2x2 matrix");
  }
  const a = matrix[0][0];
  const b = (matrix[0][1] + matrix[1][0]) / 2;
  const c = matrix[1][1];
  const center = (a + c) / 2;
  const radius = Math.sqrt(((a - c) / 2) ** 2 + b ** 2);
  const first = center + radius;
  const second = center - radius;
  const firstVector = normalize2(Math.abs(b) > EPSILON ? [first - c, b] : a >= c ? [1, 0] : [0, 1]);
  const secondVector = [-firstVector[1], firstVector[0]];
  return {
    values: [first, second],
    vectors: [firstVector, secondVector]
  };
}
function ellipseAxes(covariance, chiSquareThreshold = 5.991) {
  const eigen = eigenSymmetric2(covariance);
  return {
    major: Math.sqrt(Math.max(eigen.values[0], 0) * chiSquareThreshold),
    minor: Math.sqrt(Math.max(eigen.values[1], 0) * chiSquareThreshold),
    angleRadians: Math.atan2(eigen.vectors[0][1], eigen.vectors[0][0])
  };
}
function normalize2(vector) {
  const length = Math.hypot(vector[0], vector[1]);
  if (length < EPSILON) {
    return [1, 0];
  }
  return [vector[0] / length, vector[1] / length];
}
function assertSameShape(a, b, operation) {
  assertMatrix(a, "left matrix");
  assertMatrix(b, "right matrix");
  if (a.length !== b.length || a[0].length !== b[0].length) {
    throw new Error(`Matrix dimensions must match for ${operation}`);
  }
}

// ../liminal-test/src/scoring/kalman.ts
var EARTH_RADIUS_METERS = 6371000;
var KNOTS_PER_MPS = 1 / 0.514444;
var DEFAULT_MEASUREMENT_STD_METERS = 35;
var DEFAULT_PROCESS_ACCELERATION_STD_MPS2 = 0.012;
var DEFAULT_CHI_SQUARE_95_2D = 5.991;
var DEFAULT_ELLIPSE_SEGMENTS = 64;
function predict(trackPings, gapDurationSeconds, candidatePing, options = {}) {
  if (trackPings.length < 2) {
    throw new Error("At least two track pings are required for dark-gap prediction");
  }
  const sortedPings = [...trackPings].sort((a, b) => timeSeconds(a) - timeSeconds(b));
  const reference = { lat: sortedPings[0].lat, lon: sortedPings[0].lon };
  const measurementStd = options.measurementStdMeters ?? DEFAULT_MEASUREMENT_STD_METERS;
  const accelerationStd = options.processAccelerationStdMps2 ?? DEFAULT_PROCESS_ACCELERATION_STD_MPS2;
  const measurementVariance = measurementStd ** 2;
  const firstPoint = toLocalMeters(sortedPings[0], reference);
  const initialVelocity = velocityFromCourseSpeed(sortedPings[0]) ?? velocityFromPings(sortedPings[0], sortedPings[1], reference);
  let state = [firstPoint[0], firstPoint[1], initialVelocity[0], initialVelocity[1]];
  let covariance = [
    [measurementVariance, 0, 0, 0],
    [0, measurementVariance, 0, 0],
    [0, 0, 25, 0],
    [0, 0, 0, 25]
  ];
  let previousTime = timeSeconds(sortedPings[0]);
  for (let index = 1;index < sortedPings.length; index += 1) {
    const ping = sortedPings[index];
    const currentTime = timeSeconds(ping);
    const dt = currentTime - previousTime;
    if (dt <= 0) {
      throw new Error("Track ping timestamps must be strictly increasing");
    }
    ({ state, covariance } = predictState(state, covariance, dt, accelerationStd));
    ({ state, covariance } = updatePosition(state, covariance, toLocalMeters(ping, reference), measurementVariance));
    previousTime = currentTime;
  }
  if (!Number.isFinite(gapDurationSeconds) || gapDurationSeconds < 0) {
    throw new Error("gapDurationSeconds must be a non-negative finite number");
  }
  ({ state, covariance } = predictState(state, covariance, gapDurationSeconds, accelerationStd));
  const predictedLocal = [state[0], state[1]];
  const candidateLocal = toLocalMeters(candidatePing, reference);
  const covariance2 = [
    [covariance[0][0] + measurementVariance, covariance[0][1]],
    [covariance[1][0], covariance[1][1] + measurementVariance]
  ];
  const innovation = [candidateLocal[0] - predictedLocal[0], candidateLocal[1] - predictedLocal[1]];
  const covarianceInverse = inverse2(covariance2);
  const mahalanobisSquared = Math.max(0, dot(innovation, multiplyMatrixVector(covarianceInverse, innovation)));
  const predictedGeo = toGeoPoint(predictedLocal, reference);
  const speedMps = Math.hypot(state[2], state[3]);
  return {
    likelihood: Math.exp(-0.5 * mahalanobisSquared),
    mahalanobis: Math.sqrt(mahalanobisSquared),
    mahalanobisSquared,
    predictedState: {
      lat: predictedGeo.lat,
      lon: predictedGeo.lon,
      vxMps: state[2],
      vyMps: state[3],
      speedKnots: speedMps * KNOTS_PER_MPS,
      courseDeg: normalizeDegrees(Math.atan2(state[2], state[3]) * 180 / Math.PI)
    },
    covariance2,
    ellipsePolygon: buildEllipsePolygon(predictedLocal, covariance2, reference, options.ellipseSegments ?? DEFAULT_ELLIPSE_SEGMENTS, options.chiSquareThreshold ?? DEFAULT_CHI_SQUARE_95_2D),
    reference
  };
}
function pointMahalanobisSquared(prediction, point) {
  const center = toLocalMeters(prediction.predictedState, prediction.reference);
  const candidate = toLocalMeters(point, prediction.reference);
  const innovation = [candidate[0] - center[0], candidate[1] - center[1]];
  return Math.max(0, dot(innovation, multiplyMatrixVector(inverse2(prediction.covariance2), innovation)));
}
function isPointInsidePredictionEllipse(prediction, point, chiSquareThreshold = DEFAULT_CHI_SQUARE_95_2D) {
  return pointMahalanobisSquared(prediction, point) <= chiSquareThreshold;
}
function predictState(state, covariance, dt, accelerationStd) {
  const transition = [
    [1, 0, dt, 0],
    [0, 1, 0, dt],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
  const process = processNoise(dt, accelerationStd);
  return {
    state: multiplyMatrixVector(transition, state),
    covariance: add(multiply(multiply(transition, covariance), transpose(transition)), process)
  };
}
function updatePosition(state, covariance, measurement, measurementVariance) {
  const observation = [
    [1, 0, 0, 0],
    [0, 1, 0, 0]
  ];
  const measurementCovariance = [
    [measurementVariance, 0],
    [0, measurementVariance]
  ];
  const innovation = [
    measurement[0] - state[0],
    measurement[1] - state[1]
  ];
  const innovationCovariance = add(multiply(multiply(observation, covariance), transpose(observation)), measurementCovariance);
  const gain = multiply(multiply(covariance, transpose(observation)), inverse2(innovationCovariance));
  const update = multiplyMatrixVector(gain, innovation);
  const updatedState = state.map((value, index) => value + update[index]);
  const updatedCovariance = multiply(subtract(identity(4), multiply(gain, observation)), covariance);
  return {
    state: updatedState,
    covariance: updatedCovariance
  };
}
function processNoise(dt, accelerationStd) {
  const variance = accelerationStd ** 2;
  const dt2 = dt ** 2;
  const dt3 = dt ** 3;
  const dt4 = dt ** 4;
  return [
    [dt4 / 4 * variance, 0, dt3 / 2 * variance, 0],
    [0, dt4 / 4 * variance, 0, dt3 / 2 * variance],
    [dt3 / 2 * variance, 0, dt2 * variance, 0],
    [0, dt3 / 2 * variance, 0, dt2 * variance]
  ];
}
function toLocalMeters(point, reference) {
  const latRadians = reference.lat * Math.PI / 180;
  const x = (point.lon - reference.lon) * Math.PI * EARTH_RADIUS_METERS * Math.cos(latRadians) / 180;
  const y = (point.lat - reference.lat) * Math.PI * EARTH_RADIUS_METERS / 180;
  return [x, y];
}
function toGeoPoint(point, reference) {
  const latRadians = reference.lat * Math.PI / 180;
  return {
    lat: reference.lat + point[1] * 180 / (Math.PI * EARTH_RADIUS_METERS),
    lon: reference.lon + point[0] * 180 / (Math.PI * EARTH_RADIUS_METERS * Math.cos(latRadians))
  };
}
function velocityFromPings(a, b, reference) {
  const dt = timeSeconds(b) - timeSeconds(a);
  if (dt <= 0) {
    throw new Error("Track ping timestamps must be strictly increasing");
  }
  const first = toLocalMeters(a, reference);
  const second = toLocalMeters(b, reference);
  return [(second[0] - first[0]) / dt, (second[1] - first[1]) / dt];
}
function velocityFromCourseSpeed(ping) {
  if (!Number.isFinite(ping.sogKnots) || !Number.isFinite(ping.cogDeg)) {
    return null;
  }
  const speedMps = ping.sogKnots * 0.514444;
  const radians = ping.cogDeg * Math.PI / 180;
  return [speedMps * Math.sin(radians), speedMps * Math.cos(radians)];
}
function timeSeconds(ping) {
  const value = ping.timestamp ?? ping.t;
  if (value instanceof Date) {
    return value.getTime() / 1000;
  }
  if (typeof value === "number") {
    return value > 10000000000 ? value / 1000 : value;
  }
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) {
      return parsed / 1000;
    }
  }
  throw new Error("Each track ping must include a parseable timestamp or t value");
}
function buildEllipsePolygon(center, covariance, reference, segments, chiSquareThreshold) {
  const safeSegments = Math.max(16, Math.floor(segments));
  const axes = ellipseAxes(covariance, chiSquareThreshold);
  const cos = Math.cos(axes.angleRadians);
  const sin = Math.sin(axes.angleRadians);
  const coordinates = [];
  for (let index = 0;index <= safeSegments; index += 1) {
    const theta = index / safeSegments * Math.PI * 2;
    const unrotatedX = axes.major * Math.cos(theta);
    const unrotatedY = axes.minor * Math.sin(theta);
    const x = center[0] + unrotatedX * cos - unrotatedY * sin;
    const y = center[1] + unrotatedX * sin + unrotatedY * cos;
    const geo = toGeoPoint([x, y], reference);
    coordinates.push([geo.lon, geo.lat]);
  }
  return {
    type: "Polygon",
    coordinates: [coordinates]
  };
}
function normalizeDegrees(degrees) {
  return (degrees % 360 + 360) % 360;
}

// ../liminal-test/src/scoring/kinematics-score.ts
function kalmanKinematics(bundle) {
  const pings = bundle.filter((e) => (e.modality === "ais" || e.modality === "sar") && e.geometry && e.observed_at).sort((a, b) => Date.parse(a.observed_at) - Date.parse(b.observed_at));
  if (pings.length < 3)
    return null;
  const candidate = pings[pings.length - 1];
  const track = pings.slice(0, -1);
  const toGeo = (e) => ({ lat: e.geometry.lat, lon: e.geometry.lon, timestamp: e.observed_at });
  const gapSeconds = (Date.parse(candidate.observed_at) - Date.parse(track[track.length - 1].observed_at)) / 1000;
  try {
    const prediction = predict(track.map(toGeo), Math.max(0, gapSeconds), toGeo(candidate));
    const inside = isPointInsidePredictionEllipse(prediction, toGeo(candidate));
    return {
      verdict: inside ? "supported" : "weakened",
      confidence: Math.min(0.95, Math.max(0.1, prediction.likelihood)),
      summary: inside ? `Candidate falls inside the Kalman 95% dark-gap ellipse (mahalanobis ${prediction.mahalanobis.toFixed(2)}) — consistent with track continuity.` : `Candidate is OUTSIDE the predicted ellipse (mahalanobis ${prediction.mahalanobis.toFixed(2)}) — track continuity not supported.`,
      cited: pings.map((p) => p.id),
      mahalanobis: prediction.mahalanobis,
      inside
    };
  } catch {
    return null;
  }
}

// ../liminal-test/src/deliberation/specialists.ts
function cite(bundle, pred) {
  return bundle.filter(pred).map((e) => e.id);
}
var kinematics = (bundle) => {
  const k = kalmanKinematics(bundle);
  if (k) {
    return {
      input: { name: "kinematics", evidence: bundle, claim: { posterior: k.confidence } },
      raw: { verdict: k.verdict, summary: k.summary, cited_observation_ids: k.cited, confidence: k.confidence, unsupported_assertions: [] }
    };
  }
  const cited = cite(bundle, (e) => e.modality === "ais" || e.modality === "sar");
  return {
    input: { name: "kinematics", evidence: bundle, claim: { posterior: 0.62 } },
    raw: {
      verdict: cited.length >= 2 ? "supported" : "weakened",
      summary: "Track shows a dark gap consistent with a brief AIS disablement.",
      cited_observation_ids: cited,
      confidence: 0.62,
      unsupported_assertions: []
    }
  };
};
var identity2 = (bundle) => {
  const cited = cite(bundle, (e) => e.type === "IDENTITY_FEATURE" || e.source === "GFW" || e.source === "OPENSANCTIONS");
  return {
    input: {
      name: "identity",
      evidence: bundle,
      claim: { posterior: 0.5 },
      identity_features: { dimensions_similarity_score: null, flag_match: false, imo_match: false }
    },
    raw: {
      verdict: "supported",
      summary: "Second identity appears within the predicted ellipse; OFAC/GFW MMSI mismatch.",
      cited_observation_ids: cited,
      confidence: 0.5,
      unsupported_assertions: []
    }
  };
};
var signalIntegrity = (bundle) => {
  const flags = cite(bundle, (e) => e.type === "INTEGRITY_FLAG");
  const contested = flags.length > 0;
  const cited = flags.length ? flags : cite(bundle, () => true).slice(0, 2);
  return {
    input: { name: "signalIntegrity", evidence: bundle, claim: { posterior: contested ? 0.45 : 0.7 } },
    raw: {
      verdict: contested ? "weakened" : "supported",
      summary: contested ? "Source integrity contested: identity churn with single-source confirmation." : "Sources corroborate across modalities.",
      cited_observation_ids: cited,
      confidence: contested ? 0.45 : 0.7,
      unsupported_assertions: []
    }
  };
};
var intent = (bundle) => {
  const indicators = cite(bundle, (e) => e.type === "INTENT_INDICATOR");
  const cited = indicators.length ? indicators : cite(bundle, () => true).slice(0, 2);
  return {
    input: { name: "intent", evidence: bundle, claim: { posterior: 0.45 } },
    raw: {
      verdict: "supported",
      summary: "Pattern is consistent with hostile loitering.",
      cited_observation_ids: cited,
      confidence: 0.45,
      unsupported_assertions: ["hostile loitering"]
    }
  };
};
var collection = (bundle) => {
  const cited = cite(bundle, (e) => e.type === "COLLECTION_GAP" || e.modality === "eo" || e.modality === "sar");
  return {
    input: { name: "collection", evidence: bundle, claim: { posterior: 0.6 } },
    raw: {
      verdict: cited.length >= 2 ? "supported" : "weakened",
      summary: "Second-source EO/SAR tasking would resolve the identity contest.",
      cited_observation_ids: cited,
      confidence: 0.6,
      unsupported_assertions: []
    }
  };
};
var visual = (bundle) => {
  const cited = cite(bundle, (e) => e.modality === "eo");
  return {
    input: { name: "visual", evidence: bundle, claim: { posterior: cited.length ? 0.6 : 0.3 } },
    raw: {
      verdict: cited.length ? "supported" : "refused",
      summary: cited.length ? "EO chip shows a hull profile consistent with the primary track." : "No imagery available for the contested window.",
      cited_observation_ids: cited,
      confidence: cited.length ? 0.6 : 0.3,
      unsupported_assertions: []
    }
  };
};
var SPECIALISTS = {
  kinematics,
  identity: identity2,
  signalIntegrity,
  intent,
  collection,
  visual
};

// ../liminal-test/src/deliberation/orchestrator.ts
function runReads(bundle, question) {
  const names = Object.keys(SPECIALISTS);
  const reads = names.map((n) => SPECIALISTS[n](bundle));
  if (question) {
    const intentRead = reads.find((r) => r.input.name === "intent");
    if (intentRead)
      intentRead.input.question = question;
  }
  return reads;
}

// ../liminal-test/src/domain/types.ts
var DEFAULT_CONFIDENCE_FLOOR = 0.4;

// ../liminal-test/src/guard/guard.ts
var INTENT_PHRASE = /\b(hostile|threat|intent)\b/i;
function hasIntentIndicator(evidence) {
  return evidence.some((e) => e.type === "INTENT_INDICATOR");
}
function citedEvidence(input, raw) {
  const ids = new Set(raw.cited_observation_ids);
  return input.evidence.filter((e) => ids.has(e.id));
}
function stripUnsupported(summary, unsupported) {
  const stripped = [];
  let next = summary;
  for (const phrase of unsupported ?? []) {
    if (!phrase)
      continue;
    if (next.includes(phrase)) {
      next = next.split(phrase).join("[redacted]");
      stripped.push(phrase);
    }
  }
  return { summary: next, stripped };
}
function applyGuard(input, raw) {
  const layers = [];
  let verdict = raw.verdict;
  let forced_refused = false;
  let downgraded = false;
  const floor = input.confidence_floor ?? DEFAULT_CONFIDENCE_FLOOR;
  const cited = citedEvidence(input, raw);
  if (input.question && INTENT_PHRASE.test(input.question) && !hasIntentIndicator(input.evidence)) {
    layers.push("question_intent_phrasing_no_indicator");
    if (verdict !== "refused") {
      verdict = "refused";
      forced_refused = true;
    }
  }
  if (verdict === "supported" && raw.cited_observation_ids.length < 2) {
    layers.push("citation_min");
    verdict = "refused";
    forced_refused = true;
  }
  if (verdict !== "refused" && input.name === "intent" && !hasIntentIndicator(input.evidence)) {
    layers.push("intent_indicator");
    verdict = "refused";
    forced_refused = true;
  }
  if (verdict !== "refused" && (input.name === "kinematics" || input.name === "intent")) {
    if (cited.length > 0 && cited.every((e) => e.source === "SHODAN")) {
      layers.push("shodan_vessel_behavior");
      verdict = "refused";
      forced_refused = true;
    }
  }
  if (verdict !== "refused" && input.claim?.posterior !== undefined && input.claim.posterior < floor) {
    layers.push("posterior_floor");
    verdict = "refused";
    forced_refused = true;
  }
  if (verdict === "supported" && input.name === "identity") {
    const idf = input.identity_features;
    if (!idf || idf.dimensions_similarity_score === null && !idf.flag_match && !idf.imo_match) {
      layers.push("identity_weak");
      verdict = "weakened";
      downgraded = true;
    }
  }
  if (verdict === "supported") {
    if (cited.length > 0 && cited.every((e) => e.modality === "text" && !e.observed_at && !e.geometry)) {
      layers.push("textual_only");
      verdict = "weakened";
      downgraded = true;
    }
  }
  if (verdict === "supported" && cited.some((e) => e.classification === "local_only")) {
    layers.push("classification_withheld");
    verdict = "weakened";
    downgraded = true;
  }
  const { summary, stripped } = stripUnsupported(raw.summary, raw.unsupported_assertions);
  const guard = {
    applied_layers: layers,
    forced_refused,
    downgraded,
    stripped_assertions: stripped
  };
  return {
    name: input.name,
    verdict,
    summary,
    cited_observation_ids: raw.cited_observation_ids,
    confidence: raw.confidence,
    unsupported_assertions: raw.unsupported_assertions,
    source: "heuristic",
    guard
  };
}

// ../liminal-test/src/guard/index.ts
function guardAll(reads) {
  return reads.map(({ input, raw }) => applyGuard(input, raw));
}

// ../liminal-test/src/scoring/bayes.ts
function fuse(hypotheses) {
  if (hypotheses.length < 2) {
    throw new Error("Bayesian fusion requires at least two hypotheses");
  }
  const priorTotal = hypotheses.reduce((total, hypothesis) => {
    assertProbabilityWeight(hypothesis.prior, `prior for ${hypothesis.id}`);
    return total + hypothesis.prior;
  }, 0);
  if (priorTotal <= 0) {
    throw new Error("At least one hypothesis must have non-zero prior");
  }
  const scored = hypotheses.map((hypothesis) => {
    if (!hypothesis.id) {
      throw new Error("Hypothesis id is required");
    }
    const normalizedPrior = hypothesis.prior / priorTotal;
    const contributions = normalizeContributions(hypothesis.contributions ?? []);
    const logEvidence = contributions.reduce((total, contribution) => total + contribution.llrNats, 0);
    return {
      id: hypothesis.id,
      prior: hypothesis.prior,
      normalizedPrior,
      logEvidence,
      posterior: 0,
      contributions
    };
  });
  const logScores = scored.map((hypothesis) => Math.log(hypothesis.normalizedPrior) + hypothesis.logEvidence);
  const logNormalizer = logSumExp(logScores);
  const posteriors = {};
  const normalized = scored.map((hypothesis, index) => {
    const posterior = Math.exp(logScores[index] - logNormalizer);
    posteriors[hypothesis.id] = posterior;
    return {
      ...hypothesis,
      posterior
    };
  });
  return {
    posteriors,
    hypotheses: normalized,
    logNormalizer
  };
}
function normalizeContributions(contributions) {
  return contributions.map((contribution) => {
    const llrNats = contribution.llrNats ?? contribution.llr;
    if (!contribution.feature) {
      throw new Error("Feature contribution requires a feature name");
    }
    if (!Number.isFinite(llrNats)) {
      throw new Error(`Feature ${contribution.feature} must include a finite llrNats value`);
    }
    return {
      feature: contribution.feature,
      llrNats,
      value: contribution.value,
      evidenceIds: contribution.evidenceIds ?? []
    };
  });
}
function logSumExp(values) {
  const max = Math.max(...values);
  const total = values.reduce((sum, value) => sum + Math.exp(value - max), 0);
  return max + Math.log(total);
}
function assertProbabilityWeight(value, label) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a finite non-negative number`);
  }
}

// ../liminal-test/src/custody/case.ts
var DEFAULT_ACTIONS = [
  { id: "escalate", label: "Escalate to command", rank: 1 },
  { id: "request-eo-sar", label: "Request second-source EO/SAR collection", rank: 2 },
  { id: "monitor", label: "Continue monitoring", rank: 3 }
];
function verdictLLR(v) {
  return v === "supported" ? 0.9 : v === "weakened" ? -0.4 : v === "refused" ? -0.9 : -1.4;
}
function bayesianHypotheses(caseId, reads) {
  const get = (n) => reads.find((r2) => r2.name === n);
  const kin = get("kinematics"), id = get("identity"), si = get("signalIntegrity"), col = get("collection"), vis = get("visual");
  const c1 = [];
  const c2 = [];
  const c3 = [];
  if (kin)
    c1.push({ feature: "kinematics", llrNats: verdictLLR(kin.verdict) });
  if (id) {
    c1.push({ feature: "identity", llrNats: verdictLLR(id.verdict) });
    c2.push({ feature: "identity", llrNats: -verdictLLR(id.verdict) * 0.6 });
  }
  if (si) {
    const contested = si.verdict !== "supported";
    c1.push({ feature: "signal_integrity", llrNats: contested ? 0.5 : -0.3 });
    c3.push({ feature: "signal_integrity", llrNats: contested ? 0.2 : -0.1 });
  }
  if (col)
    c3.push({ feature: "collection", llrNats: col.verdict === "supported" ? 0.4 : -0.2 });
  if (vis)
    c1.push({ feature: "visual", llrNats: verdictLLR(vis.verdict) * 0.5 });
  const r = fuse([
    { id: `${caseId}-H1`, prior: 1 / 3, contributions: c1 },
    { id: `${caseId}-H2`, prior: 1 / 3, contributions: c2 },
    { id: `${caseId}-H3`, prior: 1 / 3, contributions: c3 }
  ]);
  return [
    { id: `${caseId}-H1`, label: "Single vessel, identity spoof", posterior: round(r.posteriors[`${caseId}-H1`]) },
    { id: `${caseId}-H2`, label: "Two distinct vessels", posterior: round(r.posteriors[`${caseId}-H2`]) },
    { id: `${caseId}-H3`, label: "Sensor artifact / dark gap", posterior: round(r.posteriors[`${caseId}-H3`]) }
  ];
}
function buildCase(caseId, reads, _facts) {
  const contested = reads.some((r) => r.name === "signalIntegrity" && (r.verdict === "weakened" || r.verdict === "refused" || r.guard.applied_layers.length > 0));
  const hypotheses = bayesianHypotheses(caseId, reads);
  const refusals = reads.filter((r) => r.guard.forced_refused).map((r) => ({ name: r.name, layers: r.guard.applied_layers }));
  const actions = contested ? rankBy(DEFAULT_ACTIONS, ["request-eo-sar", "monitor", "escalate"]) : DEFAULT_ACTIONS.map((a) => ({ ...a }));
  return {
    id: caseId,
    hypotheses,
    reads,
    actions,
    signalIntegrity: contested ? "contested" : "clear",
    refusals
  };
}
function applyDoctrine(c, rules, facts) {
  const applied = [];
  let actions = c.actions.map((a) => ({ ...a }));
  for (const rule of rules) {
    const wantsIdentityChurn = rule.conditions.some((x) => x.includes("identity_churn"));
    const wantsSingleSource = rule.conditions.some((x) => x.includes("single_source"));
    const conditionMatches = (!wantsIdentityChurn || facts.identityChurn) && (!wantsSingleSource || facts.singleSource) && (wantsIdentityChurn || wantsSingleSource);
    if (!conditionMatches)
      continue;
    if (rule.action.includes("block_escalation") || rule.action.includes("monitor")) {
      actions = rankBy(actions, ["monitor", "request-eo-sar", "escalate"]).map((a) => a.id === "escalate" ? { ...a, note: `blocked by ${rule.id}` } : a);
      applied.push(rule.id);
    }
  }
  return { case: { ...c, actions }, applied };
}
function rankBy(actions, order) {
  return actions.map((a) => ({ ...a, rank: order.indexOf(a.id) === -1 ? 99 : order.indexOf(a.id) + 1 })).sort((x, y) => x.rank - y.rank);
}
function round(n) {
  return Math.round(n * 100) / 100;
}

// ../liminal-test/src/correction/dsl.ts
var WHEN_THEN = /^\s*WHEN\s+(.+?)\s+THEN\s+(.+?)\s*$/i;
function parseReviewRule(id, text) {
  const m = WHEN_THEN.exec(text);
  if (!m) {
    throw new Error(`Review rule must be 'WHEN <condition> THEN <action>': ${text}`);
  }
  const whenRaw = m[1].trim();
  const thenRaw = m[2].trim();
  const conditions = whenRaw.split(/\s+AND\s+/i).map((s) => s.trim().toLowerCase());
  return { id, text, when: whenRaw, then: thenRaw, conditions, action: thenRaw.toLowerCase() };
}

// ../liminal-test/src/ontology/spine.ts
function projectOntology(events) {
  const nodes = [];
  const edges = [];
  let edgeId = 0;
  const ensureNode = (n) => {
    if (!nodes.find((x) => x.id === n.id))
      nodes.push(n);
  };
  for (const e of events) {
    if (e.kind === "observation.ingested") {
      const caseNodeId = `case:${e.caseId}`;
      ensureNode({ id: caseNodeId, type: "case", title: e.caseId });
      for (const o of e.observations) {
        ensureNode({ id: `obs:${o.id}`, type: "observation", title: o.summary ?? o.id, case_id: e.caseId });
        edges.push({ id: `e${edgeId++}`, type: "DERIVED_FROM", from: caseNodeId, to: `obs:${o.id}`, created_by: "system" });
      }
    }
    if (e.kind === "review_rule.signed") {
      ensureNode({ id: `rule:${e.ruleId}`, type: "reviewRule", title: e.text });
    }
    if (e.kind === "case.committed" && e.chosenHypothesisId) {
      ensureNode({ id: `hyp:${e.chosenHypothesisId}`, type: "hypothesis", title: e.chosenHypothesisId, case_id: e.caseId });
      edges.push({ id: `e${edgeId++}`, type: "REVIEWED_BY", from: `case:${e.caseId}`, to: `hyp:${e.chosenHypothesisId}`, created_by: "operator" });
    }
  }
  const ruleNodes = nodes.filter((n) => n.type === "reviewRule");
  const caseNodes = nodes.filter((n) => n.type === "case");
  for (const r of ruleNodes) {
    for (const c of caseNodes) {
      edges.push({ id: `e${edgeId++}`, type: "APPLIES_TO", from: r.id, to: c.id, created_by: "operator" });
    }
  }
  return { nodes, edges };
}

// ../liminal-test/src/vault/vault.ts
function projectVault(events) {
  return events.filter((e) => e.kind === "case.committed").map((e) => ({
    caseId: e.caseId,
    chosenHypothesisId: e.chosenHypothesisId,
    disposition: e.disposition,
    committed_at: e.ts
  }));
}
function auditChain(events) {
  return events.map((e) => ({
    ts: e.ts,
    kind: e.kind,
    caseId: "caseId" in e ? e.caseId : undefined
  }));
}

// ../liminal-test/src/fixtures/hormuz.ts
var T0 = "2026-05-28T02:00:00Z";
var T1 = "2026-05-28T02:14:00Z";
var CASE_1_BUNDLE = [
  {
    id: "ais-1",
    type: "OBSERVATION",
    source: "AIS",
    modality: "ais",
    observed_at: T0,
    geometry: { lat: 26.57, lon: 56.25 },
    summary: "MMSI-111 track prior to the dark gap"
  },
  {
    id: "ais-2",
    type: "OBSERVATION",
    source: "AIS",
    modality: "ais",
    observed_at: T1,
    geometry: { lat: 26.59, lon: 56.31 },
    summary: "MMSI-222 appears inside the Kalman-predicted ellipse"
  },
  {
    id: "sar-1",
    type: "OBSERVATION",
    source: "SENTINEL",
    modality: "sar",
    observed_at: T1,
    geometry: { lat: 26.58, lon: 56.3 },
    summary: "SAR return near the track break"
  },
  {
    id: "id-1",
    type: "IDENTITY_FEATURE",
    source: "GFW",
    modality: "text",
    summary: "GFW registry shows an MMSI/flag mismatch"
  },
  {
    id: "id-2",
    type: "IDENTITY_FEATURE",
    source: "OPENSANCTIONS",
    modality: "text",
    summary: "OFAC-listed hull associated with the second identity"
  },
  {
    id: "flag-1",
    type: "INTEGRITY_FLAG",
    source: "ROSHAK",
    modality: "text",
    summary: "Single-source confirmation only — integrity contested"
  }
];
var CASE_2_BUNDLE = [
  {
    id: "ais-3",
    type: "OBSERVATION",
    source: "AIS",
    modality: "ais",
    observed_at: T0,
    geometry: { lat: 26.41, lon: 56.12 },
    summary: "MMSI-333 track prior to a dark gap"
  },
  {
    id: "ais-4",
    type: "OBSERVATION",
    source: "AIS",
    modality: "ais",
    observed_at: T1,
    geometry: { lat: 26.44, lon: 56.18 },
    summary: "MMSI-444 appears nearby with a churned identity"
  },
  {
    id: "id-3",
    type: "IDENTITY_FEATURE",
    source: "GFW",
    modality: "text",
    summary: "GFW registry mismatch on the second identity"
  },
  {
    id: "flag-2",
    type: "INTEGRITY_FLAG",
    source: "ROSHAK",
    modality: "text",
    summary: "Single-source confirmation only — integrity contested"
  }
];

// ../liminal-test/src/browser.ts
var now = () => new Date().toISOString();
function createCustodySession() {
  setEventLog(new InMemoryEventLog);
  function ingest(caseId, bundle, facts) {
    invoke("append_event", {
      kind: "observation.ingested",
      ts: now(),
      caseId,
      observations: bundle
    });
    const guarded = guardAll(runReads(bundle));
    invoke("append_event", { kind: "reads.completed", ts: now(), caseId, reads: guarded });
    invoke("append_event", {
      kind: "guard.verdict.recorded",
      ts: now(),
      caseId,
      verdicts: guarded.map((g) => ({ name: g.name, verdict: g.verdict, layers: g.guard.applied_layers }))
    });
    return { reads: guarded, case: buildCase(caseId, guarded, facts) };
  }
  function commit(caseId, c) {
    invoke("append_event", {
      kind: "case.committed",
      ts: now(),
      caseId,
      chosenHypothesisId: c.hypotheses[0]?.id ?? null,
      disposition: c.actions[0]?.id ?? "monitor"
    });
  }
  function signRule(ruleId, text) {
    const rule = parseReviewRule(ruleId, text);
    invoke("append_event", {
      kind: "review_rule.signed",
      ts: now(),
      ruleId,
      text,
      when: rule.when,
      then: rule.then
    });
    return rule;
  }
  function activeRules() {
    return invoke("get_events").filter((e) => e.kind === "review_rule.signed").map((e) => parseReviewRule(e.ruleId, e.text));
  }
  function ingestWithDoctrine(caseId, bundle, facts) {
    const { reads, case: c } = ingest(caseId, bundle, facts);
    const { case: ranked, applied } = applyDoctrine(c, activeRules(), facts);
    return { reads, case: ranked, applied };
  }
  function projections() {
    const events = invoke("get_events");
    return {
      events,
      ontology: projectOntology(events),
      vault: projectVault(events),
      audit: auditChain(events)
    };
  }
  return { ingest, commit, signRule, activeRules, ingestWithDoctrine, projections };
}
export {
  setEventLog,
  runReads,
  projectVault,
  projectOntology,
  parseReviewRule,
  invoke,
  guardAll,
  createCustodySession,
  buildCase,
  auditChain,
  applyDoctrine,
  CASE_2_BUNDLE,
  CASE_1_BUNDLE
};
