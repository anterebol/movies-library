"use client"
import { useEffect } from "react";
import api from '@/app/API_URL'

export default function Movies() {
  useEffect(() => {
    api.get('/search_movies/sort_by=popularity.desc&page=3').then((res) => console.log(res.data));
  }, []);
  return (<h1>Movies</h1>);
}