import { describe, expect, it } from 'vitest';

import { buildDomEventModel, simulateDomClick } from './simulator';

const QUESTION_31_HTML = `<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>`;

const QUESTION_32_HTML = `<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>`;

describe('dom event simulator', () => {
  it('replays bubbling order for question 31', () => {
    const model = buildDomEventModel(QUESTION_31_HTML);
    const defaultTargetId = model.defaultTargetId;

    expect(defaultTargetId).not.toBeNull();

    const result = simulateDomClick(model, defaultTargetId ?? '');

    expect(result.target.tagName).toBe('button');
    expect(result.logs).toEqual(['button', 'second div', 'first div']);
    expect(result.steps.map((step) => [step.phase, step.tagName])).toEqual([
      ['target', 'button'],
      ['bubble', 'div'],
      ['bubble', 'div'],
    ]);
  });

  it('replays paragraph then div for question 32', () => {
    const model = buildDomEventModel(QUESTION_32_HTML);
    const defaultTargetId = model.defaultTargetId;

    expect(defaultTargetId).not.toBeNull();

    const result = simulateDomClick(model, defaultTargetId ?? '');

    expect(result.target.tagName).toBe('p');
    expect(result.logs).toEqual(['p', 'div']);
    expect(result.steps.map((step) => step.tagName)).toEqual(['p', 'div']);
  });

  it('stops bubbling when stopPropagation is called', () => {
    const model = buildDomEventModel(`<div onclick="console.log('outer')">
  <button onclick="console.log('button'); event.stopPropagation();">
    Click me
  </button>
</div>`);
    const defaultTargetId = model.defaultTargetId;

    expect(defaultTargetId).not.toBeNull();

    const result = simulateDomClick(model, defaultTargetId ?? '');

    expect(result.logs).toEqual(['button']);
    expect(result.steps).toHaveLength(1);
    expect(result.steps[0]?.stoppedPropagation).toBe(true);
  });

  it('flags handlers with unsupported logic without failing to parse the tree', () => {
    const model = buildDomEventModel(`<div onclick="alert('hello'); console.log('div')">
  <button onclick="console.log('button')">Click</button>
</div>`);

    expect(model.hasUnsupportedHandlers).toBe(true);
    expect(model.defaultTargetId).not.toBeNull();
  });
});
