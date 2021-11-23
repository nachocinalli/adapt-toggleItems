import Adapt from 'core/js/adapt';
import React from 'react';
import { html, classes, compile, templates } from 'core/js/reactHelpers';

export default function toggleItems (props) {
  const {
    _columns,
    _isSequential,
    onClick
  } = props;
  const _hasColumns = _columns > 1;

  return (

    <div className="component__inner toggleitems__inner">

      <templates.header {...props} />

      <div className={classes([
        'component__widget', 'toggleitems__widget',
        _hasColumns && 'has-columns',
        _isSequential && 'is-sequential'])}>

        {props._items.map(({ title, body, on, off, _classes, _index, _isVisited, _isActive, _isAnimated, _isHighlighted }) =>
          <div

            className={classes([
              'toggleitems__item',
              _isVisited && 'is-visited',
              _isActive && 'is-active',
              _isAnimated && 'is-animating',
              _isHighlighted && 'is-highlighted',
              _classes
            ])}
            key={_index}
            data-index={_index}
            style={(_hasColumns && Adapt.device.screenSize === 'large' && { width: `${100 / _columns}%` }) || null}
          >
            <div className="toggleitems__item-inner">
              {title &&
              <div className="toggleitems__item-title">
                {html(compile(title))}
              </div>
              }
              {body &&
              <div className="toggleitems__item-body">
                {html(compile(body))}
              </div>
              }
              <label className='toggleitems__toggle' htmlFor={`input-toggle-${props._id}-${_index}`}>
                <input
                  className="toggleitems__input"
                  onClick={onClick}
                  type='checkbox'
                  name={`input-toggle-${props._id}-${_index}`}
                  id={`input-toggle-${props._id}-${_index}`}

                />
                <span className="toggleitems__toggle-display" hidden>
                  <span className="toggle__icon toggle__icon-on">{on.label}</span>
                  <span className="toggle__icon toggle__icon-0ff">{off.label}</span>
                </span>
                <div className='toggleitems__state-container'>
                  {off && <div className={classes(['toggleitems__state', !_isActive && 'is-active'])}>
                    {off.title &&
                    <div className="toggleitems__item-title">
                      {html(compile(off.title))}
                    </div>
                    }
                    {off.body &&
                    <div className="toggleitems__item-body">
                      {html(compile(off.body))}
                    </div>
                    }
                    { off._graphic.src &&
                      <templates.image {...off._graphic}
                        classNamePrefixes={['toggleitems__item-state-0']}
                        attributionClassNamePrefixes={['toggleitems']}
                      />
                    }

                  </div>
                  }
                  {on && <div className={classes(['toggleitems__state', _isActive && 'is-active'])}>
                    {on.title &&
                  <div className="toggleitems__item-title">
                    {html(compile(on.title))}
                  </div>
                    }
                    {on.body &&
                  <div className="toggleitems__item-body">
                    {html(compile(on.body))}
                  </div>
                    }
                    { on._graphic.src &&
                    <templates.image {...on._graphic}
                      classNamePrefixes={['toggleitems__item-state-1']}
                      attributionClassNamePrefixes={['toggleitems']}
                    />
                    }

                  </div>
                  }
                </div>
              </label>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
