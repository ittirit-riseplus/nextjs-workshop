type GreetingProps = {
  name: string;
  age?: number;
};

export default function Greeting({ name, age }: GreetingProps) {
  return (
    <h1>
      สวัสดี {name} {age && `(อายุ ${age})`}
    </h1>
  );
}
