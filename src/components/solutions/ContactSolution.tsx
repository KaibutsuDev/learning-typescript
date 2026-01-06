"use client";

import { useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
}

export function ContactSolution() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (contacts.some(c => c.email === email)) return alert('Duplicate email');
    setContacts([...contacts, { id: Date.now(), name, email }]);
    setName(''); setEmail('');
  };

  const filtered = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 text-zinc-900 dark:text-zinc-100">
      <form onSubmit={add} className="flex flex-col gap-2 border p-4 rounded-lg bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
         <input 
           className="p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-transparent"
           value={name} 
           onChange={e => setName(e.target.value)} 
           placeholder="Name" 
           required 
         />
         <input 
            className="p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-transparent"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Email" 
            type="email" 
            required 
         />
         <button type="submit" className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition-colors">Add Contact</button>
      </form>

      <div className="relative">
        <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search contacts..." 
            className="w-full p-2 pl-8 border rounded-lg border-zinc-300 dark:border-zinc-700 bg-transparent"
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 absolute left-2.5 top-3 text-zinc-400">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
      </div>

      <ul className="space-y-2 max-h-40 overflow-y-auto">
        {filtered.length === 0 && <li className="text-zinc-400 text-center italic text-sm">No contacts found</li>}
        {filtered.map(c => (
          <li key={c.id} className="border p-3 rounded-lg flex justify-between items-center bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 shadow-sm">
            <span className="font-semibold">{c.name}</span>
            <span className="text-xs text-zinc-500">{c.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
