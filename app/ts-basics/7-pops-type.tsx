type ProfileProps = {
  name: string
  age: number
}

export default function Profile({ name, age }: ProfileProps) {
  // name = "New Name" ❌ แบบนี้จะ error เพราะ props เป็น read-only
  return (
    <div>
      <h2>ชื่อ: {name}</h2>
      <p>อายุ: {age}</p>
    </div>
  )
}
