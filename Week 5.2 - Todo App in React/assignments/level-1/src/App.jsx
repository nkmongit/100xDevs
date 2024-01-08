import { useState } from 'react';
import './App.css';

const interests = ['React', 'Open Source', 'Web Dev', 'Go'];
const socials = ['LinedIn', 'Twitter', 'Facebook'];

function App() {
  return (
    <div className='p-9'>
      <Card
        name={'Nishant Mohapatra'}
        desc={'Intern at The Sparks Foundation'}
        interest={interests}
        socials={socials}
      />
    </div>
  );
}

function Card({ name, desc, interest, socials }) {
  return (
    <div className='border-grey-600 border rounded w-1/3 flex flex-col p-6 gap-4 shadow-md'>
      <h2 className='font-bold'>{name}</h2>
      <div className='desc'>{desc}</div>
      <div>
        <h2 className='font-bold'>Interests</h2>
        {interest.map((i) => (
          <div>{i}</div>
        ))}
      </div>
      <div className=''>
        {socials.map((s) => (
          <button className='bg-blue-600 text-white py-2 px-4 rounded shadow-sm m-1'>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
