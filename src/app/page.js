import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex flex-col items-center justify-between p-24">
      
      <h1 style={{marginBottom: '20pt', fontSize: '20pt'}}>Rick and Morty List Character</h1>
      
      <ul className="grid grid-cols-12 gap-4">
        {
          data.results.map((character) => (
          <li className="col-span-12 md:col-span-6 lg:col-span-3 text-center" key={character.id}>
            <Link href={`/character/${character.id}`}>
              <Image src={character.image} width={120} height={80} alt={`${character.name}`} title={character.name} className="rounded-full m-auto" />
              {character.name}
            </Link>
          </li>
        ))
        } 
      </ul>
    </main>
  );
} 

async function getData(){
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if(!res.ok) throw new Error("Error al conectar al api");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}