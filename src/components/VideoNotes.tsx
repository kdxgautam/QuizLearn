import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface VideoNotesProps {
  videoId: string;
}

export const VideoNotes = ({ videoId }: VideoNotesProps) => {
  const [notes, setNotes] = useLocalStorage(`notes-${videoId}`, '');
  const [isEditing, setIsEditing] = useState(false);
  const [tempNotes, setTempNotes] = useState(notes);

  const handleSave = () => {
    setNotes(tempNotes);
    setIsEditing(false);
  };

  return (
    <Card className="mt-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Notes</h3>
          {!isEditing ? (
            <Button variant="outline" onClick={() => {
              setTempNotes(notes);
              setIsEditing(true);
            }}>
              Edit Notes
            </Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Notes
              </Button>
            </div>
          )}
        </div>
        {isEditing ? (
          <Textarea
            value={tempNotes}
            onChange={(e) => setTempNotes(e.target.value)}
            className="min-h-[200px]"
            placeholder="Add your notes here..."
          />
        ) : (
          <div className="prose max-w-none">
            {notes ? (
              <p className="whitespace-pre-wrap">{notes}</p>
            ) : (
              <p className="text-gray-500 italic">No notes yet. Click Edit Notes to add some.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};