import { create } from 'zustand';

export const useArtistsStore = create((set) => ({

    artistData: [],
    singleArtist: [],
    imageToDisplay: [],
    loading: false,
    error: null,

    setImageToDisplay: (input) => set({imageToDisplay: input}),

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
},
fetchSingleArtist: async (id) => {
  set({ loading: true });

  const URL_singleArtist = `https://izabels-first-api.onrender.com/artists/${id}`;
  try {
    const response = await fetch(URL_singleArtist, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Could not fetch");
    }
    const data = await response.json();
    console.log("Fetch single product", data);
    set({ singleArtist: data,  imageToDisplay: {
      image: data[0]?.images?.[0]?.image,
      alt: data[0]?.images?.[0]?.alt,
    } });
  } catch (error) {
    console.error("error:", error);
    set({ error: error });
  } finally {
    set({ loading: false });
  }
}
}))
