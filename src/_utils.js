import tinygradient from 'tinygradient';

// This is an internal function to help with easily creating SVG elements with an object of attributes
export const svgElem = (type, attrs) => {
  let elem = document.createElementNS('http://www.w3.org/2000/svg', type);

  Object.keys(attrs).forEach(attr => elem.setAttribute(attr, attrs[attr]));

  return elem;
};

// This is an internal function to help with the repetition of adding fill, stroke, and stroke-width attributes
export const styleAttrs = (fill, stroke, strokeWidth, i) => {
  const determineColor = (type, i) =>
    typeof type === 'string' ? type : tinygradient(type).rgbAt(i);

  const attrs = {};

  if (stroke) {
    attrs['stroke'] = determineColor(stroke, i);
    attrs['stroke-width'] = strokeWidth;
  }

  if (fill) {
    attrs['fill'] = determineColor(fill, i);
  }

  return attrs;
};

export const segmentToD = samples => {
  let d = '';

  samples.forEach((sample, i) => {
    const { x, y } = sample,
      prevSample = i === 0 ? null : samples[i - 1];

    if (i === 0 && i !== samples.length - 1) {
      d += `M${x},${y}`;
    } else if (x !== prevSample.x && y !== prevSample.y) {
      d += `L${x},${y}`;
    } else if (x !== prevSample.x) {
      d += `H${x}`;
    } else if (y !== prevSample.y) {
      d += `V${y}`;
    }

    if (i === samples.length - 1) {
      d += 'Z';
    }
  });

  return d;
};

export const getMiddleSample = samples => {
  const sortedSamples = [...samples].sort((a, b) => a.progress - b.progress);

  return sortedSamples[(sortedSamples.length / 2) | 0];
};
