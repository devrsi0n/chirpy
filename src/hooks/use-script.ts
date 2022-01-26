import * as React from 'react';

export type Status = 'idle' | 'loading' | 'ready' | 'error';
export type ScriptElt = HTMLScriptElement | null;

export function useScript(src: string, dataset?: DOMStringMap): Status {
  const [status, setStatus] = React.useState<Status>(src ? 'loading' : 'idle');

  React.useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    let script: ScriptElt = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      if (dataset) {
        for (const [key, value] of Object.entries(dataset)) {
          script.dataset[key] = value;
        }
      }
      script.dataset.status = 'loading';
      document.body.append(script);

      // Store status in attribute on script
      // This can be read by other instances of this hook
      const setAttributeFromEvent = (event: Event) => {
        script!.dataset.status = getStatus(event);
      };

      script.addEventListener('load', setAttributeFromEvent);
      script.addEventListener('error', setAttributeFromEvent);
    } else {
      // Grab existing script status from attribute and set to state.
      setStatus(script.dataset.status as Status);
    }

    // Script event handler to update status in state
    // Note: Even if the script already exists we still need to add
    // event handlers to update the state for *this* hook instance.
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const setStateFromEvent = (event: Event) => {
      setStatus(getStatus(event));
    };

    script.addEventListener('load', setStateFromEvent);
    script.addEventListener('error', setStateFromEvent);

    return () => {
      if (script) {
        script.removeEventListener('load', setStateFromEvent);
        script.removeEventListener('error', setStateFromEvent);
      }
    };
  }, [dataset, src]);

  return status;
}

const getStatus = (event: Event) => (event.type === 'load' ? 'ready' : 'error');
