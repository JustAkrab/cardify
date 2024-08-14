'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Subscribe({ onSubmit }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(email);
    setEmail('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center space-x-4 mx-auto mt-12">
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className='h-12 bg-gray-50'
      />
      <Button type="submit" className='h-12'>Subscribe</Button>
    </form>
  )
}
