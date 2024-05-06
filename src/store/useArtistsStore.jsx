import { create } from 'zustand';

export const useArtistsStore = create((set) => ({

    artistData: [],
    loading: false,
    error: null,

   fetchArtists: async () => {
  set({ loading: true, error: null }); // Set loading and clear error
  
  try {
    const response = await fetch('https://izabels-first-api.onrender.com/artists', {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Could not fetch');
    }
    
    const data = await response.json();
    
    // Update state immutably
    set({
     
      artistData: data,
    })
    
    console.log(data)
  } catch (error) {
    console.log('error:', error);
    set({ error: error });
  } finally {
    set({ loading: false }); // Set loading to false when done
  }
}}))
