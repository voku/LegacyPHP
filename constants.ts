import { MonsterPartData } from './types';

export const MONSTER_DATA: Record<string, MonsterPartData> = {
  head: {
    id: 'head',
    title: 'The Brain: Analysis & Thinking',
    subtitle: 'First rule: Think or ask someone',
    description: 'Before touching legacy code, you must understand it. Analyzing is the most critical step to avoid breaking existing functionality.',
    points: [
      {
        summary: 'Think first, ask the team second.',
        detail: 'Do not rush into changes. Discuss with the team to understand the historical context and potential side effects before writing code.'
      },
      {
        summary: 'Errors: Custom error handlers.',
        detail: 'Implement custom error handlers that report notices, bad asserts, and wrong code usage with all relevant context.'
      },
      {
        summary: 'Logging: Understandable logging.',
        detail: 'Use tools like syslog for medium-sized applications to keep logs centralized and searchable.'
      },
      {
        summary: 'Grouping: Aggregate errors.',
        detail: 'Use Sentry to group errors. It helps you prioritize by seeing how many customers are affected by a specific issue.'
      },
      {
        summary: 'Git History: Analyze changes.',
        detail: 'Often new bugs are introduced by recent changes. Good commit messages help track down the root cause quickly.'
      },
      {
        summary: 'Local Containers: Debug safely.',
        detail: 'Download the app with a prod-like database dump to analyze problems locally without touching production.'
      },
      {
        summary: 'Database Tools: EXPLAIN SQL.',
        detail: 'Use "EXPLAIN" to analyze slow queries and rely on IDE integration for database structure visibility.'
      }
    ],
    icon: 'brain'
  },
  torso: {
    id: 'torso',
    title: 'The Heart: A Love Story',
    subtitle: 'Escaping the Legacy Codebase',
    description: 'After years working with >10 year old PHP code, the core philosophy is that you CAN escape the legacy trap and introduce modern practices in a well-maintained system.',
    points: [
      {
        summary: 'You can introduce whatever is helpful.',
        detail: 'Legacy does not mean frozen. You can introduce modern tools and patterns alongside old code.'
      },
      {
        summary: 'Transform it into a well-maintained system.',
        detail: 'The goal is to gradually refactor the system until it is stable, typed, and clean.'
      },
      {
        summary: 'It requires patience.',
        detail: 'Refactoring is a marathon, not a sprint. Small, consistent improvements compound over time.'
      },
      {
        summary: 'Do not be afraid of the monster.',
        detail: 'Tame it by understanding it. Once you have tests and static analysis, the fear disappears.'
      }
    ],
    icon: 'heart'
  },
  leftArm: {
    id: 'leftArm',
    title: 'Left Arm: The 5 Core Steps',
    subtitle: 'The heavy lifting of refactoring',
    description: 'These are the first 5 important steps taken to modernize the codebase.',
    points: [
      {
        summary: 'Custom Error Handling.',
        detail: 'Report bad "assert" calls, bad indexes, and wrong code usage explicitly to developers.'
      },
      {
        summary: 'Autocompletion for everything.',
        detail: 'Annotate classes, properties, SQL queries, CSS, HTML, and JS in PHP (e.g. via @lang annotations) to enable IDE support.'
      },
      {
        summary: 'Static-Code Analysis.',
        detail: 'Preventing bugs is better than fixing them. Use types and analysis tools to stop stupid bugs.'
      },
      {
        summary: 'Automate the Refactoring.',
        detail: 'Use tools like PHP-CS-Fixer or Rector to fix code once and prevent future regressions automatically.'
      },
      {
        summary: 'No Strings for Code.',
        detail: 'Use constants, classes, and properties instead of magic strings so static analysis can validate them.'
      }
    ],
    icon: 'wrench'
  },
  rightArm: {
    id: 'rightArm',
    title: 'Right Arm: The 5 Additional Steps',
    subtitle: 'Advanced tooling and standards',
    description: 'Once the basics are in place, these 5 additional steps solidify the stability.',
    points: [
      {
        summary: 'Sentry: External error collecting.',
        detail: 'Use custom handlers to add context (like Active Record IDs) to error reports.'
      },
      {
        summary: 'Generics via PHPDocs.',
        detail: 'Add generic types to PHPDocs to greatly improve IDE autocompletion and static analysis.'
      },
      {
        summary: 'No "mixed" types.',
        detail: 'Be specific. Use "array<int, string>" instead of just "array" to make data structures predictable.'
      },
      {
        summary: 'PSR Standards.',
        detail: 'Adopt community standards like PSR-15 (handlers), PSR-11 (container), and PSR-3 (logger) for interoperability.'
      },
      {
        summary: 'Code Style Enforcer.',
        detail: 'One code style to rule them all. Use PHP-CS-Fixer/PHP_CodeSniffer to check all ~10,000 classes automatically.'
      }
    ],
    icon: 'shield'
  },
  legs: {
    id: 'legs',
    title: 'The Legs: Fixing & Preventing',
    subtitle: 'Moving forward and standing ground',
    description: 'How to fix existing code efficiently and prevent future bugs from dragging you down.',
    points: [
      {
        summary: 'IDE: PhpStorm.',
        detail: 'Use an IDE with full auto-completion and suggestion capabilities powered by your static analysis.'
      },
      {
        summary: 'Auto-Formatter.',
        detail: 'Run as a pre-commit hook so you never have to waste mental energy discussing code style.'
      },
      {
        summary: 'Git Skills.',
        detail: 'Learn to use revert, cherry-pick, and bisect to manage changes and find bugs efficiently.'
      },
      {
        summary: 'Custom Static Analysis Rules.',
        detail: 'Write your own custom rules to enforce project-specific architectural constraints.'
      },
      {
        summary: 'Root Cause Analysis.',
        detail: 'Don\'t just patch the symptom. Spend the time to understand and fix the underlying root cause.'
      },
      {
        summary: 'Testing.',
        detail: 'Writing a test is always a good idea, at least to ensure the same bug never comes back.'
      }
    ],
    icon: 'footprints'
  }
};
