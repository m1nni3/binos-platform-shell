import { useRef } from 'react';
import { Card } from '../ui';
import { Badge } from '../ui/Badge';
import { DataTable } from '../ui/DataTable';
import { Upload, Trash2 } from 'lucide-react';
import { useBinos, dataStore } from '../../data/useBinos';
import { toast } from '../../lib/toast';

const extType: Record<string, string> = {
  pdf: 'PDF', doc: 'Word', docx: 'Word', xls: 'Spreadsheet', xlsx: 'Spreadsheet',
  png: 'Image', jpg: 'Image', jpeg: 'Image', ppt: 'Slides', pptx: 'Slides',
};

export function DocumentsView() {
  const { documents } = useBinos();
  const fileRef = useRef<HTMLInputElement>(null);

  const onFiles = (list: FileList | null) => {
    if (!list) return;
    Array.from(list).forEach((f) => {
      const ext = f.name.split('.').pop()?.toLowerCase() || '';
      dataStore.add('documents', {
        name: f.name,
        type: extType[ext] || 'File',
        size: f.size < 1024 * 1024 ? `${Math.max(1, Math.round(f.size / 1024))} KB` : `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        date: new Date().toISOString().slice(0, 10),
      });
    });
    toast(`Uploaded ${list.length} file(s)`, 'success');
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Documents</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Folders, previews, version history, and tags</p>
        </div>
        <button className="btn-primary" onClick={() => fileRef.current?.click()}>
          <Upload className="w-4 h-4 mr-2" /> Upload
        </button>
        <input ref={fileRef} type="file" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
      </div>

      <Card>
        <DataTable
          caption="Documents"
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'type', label: 'Type', render: (r) => <Badge variant="default">{r.type}</Badge> },
            { key: 'size', label: 'Size' },
            { key: 'date', label: 'Date' },
            {
              key: 'actions',
              label: '',
              render: (r) => (
                <button onClick={() => { dataStore.remove('documents', r.id); toast('Document removed', 'info'); }} className="text-red-600 hover:underline text-xs">
                  <Trash2 className="w-4 h-4" />
                </button>
              ),
            },
          ]}
          rows={documents}
          empty={<div className="p-8 text-center text-sm text-slate-500">No documents yet. Upload a file to get started.</div>}
        />
      </Card>
    </div>
  );
}
