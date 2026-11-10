/*
 * Avatar Field Guide — 20-question sorting expansion
 * 10 Animal Double questions + 10 Ideal Companion questions.
 * Load after the original inline script in index.html.
 * No external libraries required; compatible with the bestiary-lore.js extension.
 */
(() => {
  'use strict';

  if (window.__avatarTwentyQuestionQuiz) return;
  if (typeof questions === 'undefined' || typeof creatures === 'undefined' ||
      typeof profile !== 'function' || typeof calc !== 'function' ||
      typeof renderQuiz !== 'function' || typeof renderResult !== 'function') {
    console.error('Avatar quiz expansion: load quiz-20.js AFTER the main quiz script.');
    return;
  }

  const self = questions.filter(q => q.mode === 'self');
  const companion = questions.filter(q => q.mode === 'comp');
  if (self.length !== 8 || companion.length !== 4) {
    console.error('Avatar quiz expansion: unexpected question counts; update was not applied.');
    return;
  }

  const additionalSelf = [
    {
      q: 'You discover a hidden passage beneath an Earth Kingdom city. What do you do first?',
      mode: 'self',
      a: [
        ['Go first to make sure the path is safe', [2, 1, 0, 0, 0, 0]],
        ['Check that everyone is comfortable going in', [0, 2, 0, 0, 2, 0]],
        ['Study the symbols carved into the stone', [0, 0, 2, 0, 1, 1]],
        ['Turn the discovery into a shared adventure', [1, 0, 1, 2, 0, 0]]
      ]
    },
    {
      q: 'Two friends cannot agree on what to do next. How do you help?',
      mode: 'self',
      a: [
        ['Say what needs to be said, even if it is difficult', [2, 0, 0, 0, 1, 0]],
        ['Listen to both and find common ground', [0, 2, 0, 0, 2, 0]],
        ['Look for a solution neither has considered', [0, 0, 2, 0, 0, 1]],
        ['Help them see the bigger picture', [0, 1, 0, 0, 1, 2]]
      ]
    }
  ];

  const additionalCompanion = [
    {
      q: 'What sort of home would suit your animal companion best?',
      mode: 'comp', type: 'size',
      a: [
        ['A little nook close to me', 'tiny'],
        ['A cozy place with room to explore', 'small'],
        ['A spacious home and a big yard', 'large'],
        ['Wide-open land for an enormous friend', 'giant']
      ]
    },
    {
      q: 'Where would you most enjoy spending a whole day together?',
      mode: 'comp', type: 'world',
      a: [
        ['On the road toward the next town', 'travel'],
        ['Among familiar streets and friendly faces', 'city'],
        ['On forest paths and mountain trails', 'wilderness'],
        ['At a quiet place filled with ancient mystery', 'spirit']
      ]
    },
    {
      q: 'Which shared adventure sounds the most rewarding?',
      mode: 'comp', type: 'world',
      a: [
        ['Crossing the world together', 'travel'],
        ['Discovering hidden corners of a busy city', 'city'],
        ['Exploring an untouched landscape', 'wilderness'],
        ['Learning the secrets of the Spirit World', 'spirit']
      ]
    },
    {
      q: 'When you have had a difficult day, what should your companion offer?',
      mode: 'comp', type: 'role',
      a: [
        ['A reassuring feeling of safety', 'protector'],
        ['A silly distraction and a reason to laugh', 'playmate'],
        ['A new way of looking at the problem', 'guide'],
        ['Quiet company without any pressure', 'comfort']
      ]
    },
    {
      q: 'What would make your companion especially valuable on an adventure?',
      mode: 'comp', type: 'role',
      a: [
        ['Keeping watch when the path turns dangerous', 'protector'],
        ['Making every stop feel exciting', 'playmate'],
        ['Helping find the right path forward', 'guide'],
        ['Reminding me I am not alone', 'comfort']
      ]
    },
    {
      q: 'What makes a friendship with an animal feel truly magical?',
      mode: 'comp', type: 'bond',
      a: [
        ['Facing the unknown side by side', 'bravery'],
        ['Knowing we will always care for each other', 'warmth'],
        ['Discovering something new every day', 'curiosity'],
        ['Understanding each other without words', 'mystery']
      ]
    }
  ];

  // Keep the two modes together. Mutate the original const array in place.
  questions.splice(0, questions.length, ...self, ...additionalSelf, ...companion, ...additionalCompanion);
  window.__avatarTwentyQuestionQuiz = true;
  const selfCount = 10;

  // Include all ten personality answers when matching an animal double.
  profile = function () {
    const raw = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < selfCount; i++) {
      const selected = questions[i].a[answers[i]][1];
      selected.forEach((n, j) => { raw[j] += n; });
    }
    const peak = Math.max(...raw, 1);
    return raw.map(v => Math.round((1 + 4 * v / peak) * 10) / 10);
  };

  // Use ALL ten companion preferences. Each category is averaged, so categories
  // with more questions don't unfairly outweigh categories with fewer questions.
  calc = function () {
    const p = profile();
    const doubleRank = creatures
      .map(c => ({ ...c, d: dist(p, c.v) }))
      .sort((a, b) => a.d - b.d);

    const votes = { size: [], world: [], role: [], bond: [] };
    for (let i = selfCount; i < questions.length; i++) {
      const q = questions[i];
      if (votes[q.type]) votes[q.type].push(q.a[answers[i]][1]);
    }

    const compatibleSizes = {
      tiny: ['tiny', 'small'],
      small: ['small', 'tiny', 'medium'],
      large: ['large', 'giant', 'medium'],
      giant: ['giant', 'large']
    };
    const bondTraits = { bravery: 0, warmth: 1, curiosity: 2, mystery: 5 };
    const average = (choices, score) => choices.length
      ? choices.reduce((sum, choice) => sum + score(choice), 0) / choices.length
      : 0;

    const mateRank = creatures
      .filter(c => c.name !== doubleRank[0].name)
      .map(c => {
        let fit = 30 - dist(p, c.v) * 0.28;
        fit += average(votes.size, value => compatibleSizes[value]?.includes(c.size) ? 9 : 0);
        fit += average(votes.world, value => value === c.world ? 8 : 0);
        fit += average(votes.role, value => value === c.role ? 10 : 0);
        fit += average(votes.bond, value => (c.v[bondTraits[value]] || 0) * 1.8);
        return { ...c, fit };
      })
      .sort((a, b) => b.fit - a.fit);

    const preference = type => {
      const counts = {};
      for (const vote of votes[type]) counts[vote] = (counts[vote] || 0) + 1;
      return Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    };

    return {
      p,
      double: doubleRank[0], mate: mateRank[0],
      otherDouble: doubleRank.slice(1, 4), otherMate: mateRank.slice(1, 4),
      pref: { size: preference('size'), world: preference('world'),
              role: preference('role'), bond: preference('bond') }
    };
  };

  const originalRenderQuiz = renderQuiz;
  renderQuiz = function () {
    originalRenderQuiz();
    if (step < questions.length) {
      const label = document.querySelector('#quizMount .quiz-head .small');
      if (label) {
        label.textContent = `Question ${(step % 10) + 1} of 10 · Overall ${step + 1} of 20`;
      }
    }
  };

  const originalRenderResult = renderResult;
  renderResult = function () {
    originalRenderResult();
    const label = document.querySelector('#quizMount .quiz-head .small');
    if (label) label.textContent = '20 / 20 questions completed';
  };

  // Update the introductory copy without changing the styling or markup.
  const heroIntro = document.querySelector('.hero .lede');
  if (heroIntro) {
    heroIntro.innerHTML = heroIntro.innerHTML.replace(
      /through twelve choices/i, 'through twenty choices'
    );
  }
  const quizIntro = document.querySelector('#quiz .lede');
  if (quizIntro) {
    quizIntro.textContent =
      'Answer instinctively. The first ten choices determine your animal double; ' +
      'the final ten describe the partner you would actually want beside you. ' +
      'Results are interpretive, not official canon.';
  }

  // The original page has already initialized by the time this file loads.
  // Re-render so its progress counter shows 20 questions immediately.
  renderQuiz();
})();
