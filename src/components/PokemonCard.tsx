import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  name: string;
  image: string;
}

export function PokemonCard({ id, name, image }: Props) {
  return (
    <Link
      to={`/pokemon/${id}`}
      className="card-glass card-hover p-4 rounded-2xl flex flex-col items-center cursor-pointer"
    >
      <img src={image} alt={name} className="w-20 h-20 mb-2 drop-shadow-md" />
      <p className="capitalize font-semibold text-gray-100">{name}</p>
      <span className="text-xs text-cyan-300 mt-1">#{id}</span>
    </Link>
  );
}
