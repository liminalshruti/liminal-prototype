import * as React from 'react';

export type TileState = 'on-slate' | 'refused' | 'vault';

export interface TileLightProps {
  /** If true, applies `.is-active` to the light indicator. */
  active?: boolean;
}

export interface TileBarProps {
  /** Source identifier (full name, not abbreviated). */
  source?: React.ReactNode;
  /** Live status label. */
  live?: React.ReactNode;
  /** Array of light indicators. Each can be active/inactive. */
  lights?: TileLightProps[];
}

export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual state.
   * - `on-slate` — dimmed when placed on slate
   * - `refused` — boundary violation (judgment red)
   * - `vault` — vault entry styling (accent tint)
   */
  state?: TileState;
  /** Title label. Renders in `.t-label`. */
  label?: React.ReactNode;
  /** Preview code/text snippet. Renders in `.t-snippet`. */
  snippet?: React.ReactNode;
  /** Bar configuration (source, live, lights). */
  bar?: TileBarProps;
}

/**
 * Tile — draggable unit from tray with macOS-style window chrome.
 *
 * A card with a dark title bar containing LED lights, source identifier,
 * and live status, plus a content window with label and code snippet.
 * Maps to `.tile-frame`, `.tile-bar-line`, `.tb-lights`, `.tb-light`,
 * `.tb-source`, `.tb-live`, `.tile-window`, `.t-label`, and `.t-snippet`
 * classes from `components/product-surfaces.css`.
 *
 * @example
 * <Tile
 *   state="vault"
 *   label="User Profile"
 *   snippet="const user = { name: 'Alice' }"
 *   bar={{
 *     lights: [{active: true}, {active: false}, {active: true}],
 *     source: 'system.profile',
 *     live: 'live'
 *   }}
 * />
 */
export function Tile({
  state,
  label,
  snippet,
  bar,
  className,
  children,
  ...rest
}: TileProps) {
  const cls = [
    'tile-frame',
    state ? `is-${state}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} {...rest}>
      {bar && (
        <div className="tile-bar-line">
          {bar.lights && bar.lights.length > 0 && (
            <span className="tb-lights">
              {bar.lights.map((light, i) => (
                <span
                  key={i}
                  className={['tb-light', light.active ? 'is-active' : '']
                    .filter(Boolean)
                    .join(' ')}
                />
              ))}
            </span>
          )}
          {bar.source && <span className="tb-source">{bar.source}</span>}
          {bar.live && <span className="tb-live">{bar.live}</span>}
        </div>
      )}
      <div className="tile-window">
        {label && <div className="t-label">{label}</div>}
        {snippet && <div className="t-snippet">{snippet}</div>}
        {children}
      </div>
    </div>
  );
}

export default Tile;
