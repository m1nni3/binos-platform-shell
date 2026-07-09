import { useState } from 'react';
import { Pin, Plus } from 'lucide-react';
import { useBinos, dataStore, Task } from '../../data/useBinos';
import { Modal } from '../ui/Modal';
import { toast } from '../../lib/toast';

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
  const { tasks: taskData } = useBinos();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', assignee: '', priority: 'Medium', due: '', status: 'Todo' });
  const noteGroups = groupByStatus(taskData);

  const advance = (task: Task) => {
    const order = ['Todo', 'In Progress', 'Overdue', 'Done'];
    const next = order[(order.indexOf(task.status || 'Todo') + 1) % order.length];
    dataStore.update('tasks', task.id, { status: next });
    toast(`Moved to ${next}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Task Centre</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Personal, team, and overdue task management</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </button>
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
                    <li key={task.id} className="postit-item cursor-pointer" onClick={() => advance(task)} title="Click to advance status">
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

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Task">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Send lease renewal" className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Assignee</label>
              <input value={form.assignee} onChange={(e) => setForm({ ...form, assignee: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Due</label>
              <input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="input-field">
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                <option>Todo</option><option>In Progress</option><option>Overdue</option><option>Done</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => {
              if (!form.title.trim()) { toast('Title is required', 'error'); return; }
              dataStore.add('tasks', { ...form });
              toast('Task added'); setShowModal(false);
              setForm({ title: '', assignee: '', priority: 'Medium', due: '', status: 'Todo' });
            }}>Save Task</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
