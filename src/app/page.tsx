import Image from "next/image";

const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
}

const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}

export default function Home() {
  return (
    <main className="p-4">
      home
    </main>
  );
}
