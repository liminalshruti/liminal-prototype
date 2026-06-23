import { Framing } from '@liminal/design-system';
import { Surface } from './_surface';

/** The serif (founder) register — warm, editorial. */
export function Serif() {
  return (
    <Surface>
      <div style={{ maxWidth: 560 }}>
        <Framing
          register="serif"
          lead="We started where the founder already lives —"
          payload="the daily decisions nobody else sees."
        />
      </div>
    </Surface>
  );
}

/** The mono (operator / high-stakes) register — austere, precise. */
export function Mono() {
  return (
    <Surface>
      <div style={{ maxWidth: 560 }}>
        <Framing
          register="mono"
          lead="Agent-trust is not a feature. It is the substrate."
          payload="Every action is sealed, attributed, and re-enterable."
        />
      </div>
    </Surface>
  );
}

/** Both voices stacked — same job, two registers. */
export function BothRegisters() {
  return (
    <Surface>
      <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Framing
          register="serif"
          lead="The wedge is a founder running multi-agent systems."
          payload="Judgment is the bottleneck when anyone can build."
        />
        <Framing
          register="mono"
          lead="Refusal increases trust."
          payload="A bounded agent that says “not my ground” is the signal."
        />
      </div>
    </Surface>
  );
}
