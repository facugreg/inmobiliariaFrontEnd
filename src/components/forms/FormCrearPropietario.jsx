

/*
const addProductMutation = useMutation({
    mutationFn: addProduct, // Función que realiza la llamada a la API POST/PUT/DELETE
    onSuccess: (newProduct) => {
      // Esta función se ejecuta si la mutación fue exitosa
      console.log("Producto agregado:", newProduct);

      // Invalida la caché de 'productos' para que se vuelva a cargar
      // Esto asegura que la lista de productos se actualice automáticamente
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
    onError: (err) => {
      // Esta función se ejecuta si la mutación falla
      console.error(`Error al agregar el producto: ${err.message}`)
    },
  });

*/