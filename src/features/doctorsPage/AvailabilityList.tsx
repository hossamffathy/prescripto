
import React, { useState } from 'react';

type TimeSlot = {
  date: string;
  time: string;
};

export default function TimeInputForm() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const addSlot = () => {
    if (!date || !time) return;
    setSlots([...slots, { date, time }]);
    setDate('');
    setTime('');
  };

  const submitSlots = async () => {
    for (const slot of slots) {
      const isoStartTime = new Date(`${slot.date}T${slot.time}:00Z`).toISOString();
      await fetch('/api/v1/timeBlocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startTime: isoStartTime }),
      });
    }
    alert('All time slots submitted.');
    setSlots([]);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">Add Available Time</h2>
      <div className="flex flex-col gap-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={addSlot}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Slot
        </button>
      </div>

      {slots.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Selected Time Slots:</h3>
          <ul className="list-disc ml-5">
            {slots.map((slot, idx) => (
              <li key={idx}>
                {slot.date} at {slot.time}
              </li>
            ))}
          </ul>
          <button
            onClick={submitSlots}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit All
          </button>
        </div>
      )}
    </div>
  );
}
