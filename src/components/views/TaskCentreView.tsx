import { Pin } from 'lucide-react';
import { tasks as taskData } from '../../data/mockData';

type Task = (typeof taskData)[number];

const priorityDot: Record<string, string> = {
  High: 'bg-accent-coral',
  Medium: 'bg-brand-orange',
  Low: 'bg-brand-green',
};

// Preferred left-to-right ordering for known statuses; anything else is
// appended alphabetically so new statuses never get dropped.
const STATUS_ORDER = ['In Progress', 'Todo', 'Overdue', 'Done'];

// A little hand-pinned imperfection so the board doesn't look too tidy.
const NOTE_ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-3'];

function groupByStatus(items: Task[]) {
  const groups = new Map<string, Task[]>();
  for (const task of items) {
    const key = task.status || 'Unsorted';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(task);
  }
  const known = STATUS_ORDER.filter((status) => groups.has(status));
  const rest = [...groups.keys()].filter((status) => !STATUS_ORDER.includes(status)).sort();
  return [...known, ...rest].map((status) => ({ status, items: groups.get(status)! }));
}

export function TaskCentreView() {
  const noteGroups = groupByStatus(taskData);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Task Centre</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Personal, team, and overdue task management</p>
      </div>

      <div className="corkboard rounded-3xl p-6 sm:p-10">
        {noteGroups.length === 0 ? (
          <p className="text-sm font-medium text-white/80">No tasks pinned up yet.</p>
        ) : (
          <div className="flex flex-wrap items-start gap-x-10 gap-y-12">
            {noteGroups.map((group, idx) => (
              <div key={group.status} className={`postit ${NOTE_ROTATIONS[idx % NOTE_ROTATIONS.length]}`}>
                <span className="postit-pin" aria-hidden="true">
                  <span className="postit-pin-head" />
                  <Pin className="postit-pin-icon" strokeWidth={2.5} />
                </span>

                <h3 className="postit-heading">{group.status}</h3>
                <p className="postit-count">
                  {group.items.length} task{group.items.length === 1 ? '' : 's'}
                </p>

                <ul className="postit-list">
                  {group.items.map((task) => (
                    <li key={task.id} className="postit-item">
                      <span
                        className={`postit-priority-dot ${priorityDot[task.priority] || 'bg-neutral-gray'}`}
                        title={`${task.priority} priority`}
                      />
                      <div className="min-w-0">
                        <p className="postit-item-title">{task.title}</p>
                        <p className="postit-item-meta">
                          {task.assignee} &middot; Due {task.due}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
