// src/Hello.tsx

type HelloProps = {
  name: string;
  age?: number; // опционально
};

export default function Hello({ name, age }: HelloProps) {
  return (
    <>
      <h2>Hello {name}</h2>
      {age !== undefined && <p>You are {age} years old.</p>}
    </>
  );
}
