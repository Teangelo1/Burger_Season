document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    // UPDATE
    const changeBurgerBtns = document.querySelectorAll('.change-devoured');
  
    // Set up the event listener for the create button
    if (changeBurgerBtns) {
      changeBurgerBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          console.log('test');
          // Grabs the id of the element that goes by the name, "id"
          const id = e.target.getAttribute('data-id');
          const newDevour = e.target.getAttribute('data-newdevour');
  
          const newDevourState = {
           devoured: newDevour,
          };
  
          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            // make sure to serialize the JSON body
            body: JSON.stringify(newDevourState),
          }).then((response) => {
            // Check that the response is all good
            // Reload the page so the user can see the new quote
            if (response.ok) {
              console.log(`changed devour to: ${newDevour}`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }
  
    // CREATE
    const createBurgerBtn = document.getElementById('create-form');
  
    if (createBurgerBtn) {
      createBurgerBtn.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // Grabs the value of the textarea that goes by the name, "quote"
        const newBurger = {
          burger_name: document.getElementById('ca').value.trim(),
          devoured: document.getElementById('devoured').checked,
        };
  
        // Send POST request to create a new quote
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
  
          // make sure to serialize the JSON body
          body: JSON.stringify(newBurger),
        }).then(() => {
          // Empty the form
          document.getElementById('ca').value = '';
  
          // Reload the page so the user can see the new quote
          console.log('Built a new burger!');
          location.reload();
        });
      });
    }
  });
  
  // Working on delete button
  // const deleteBurgerBtns = document.querySelectorAll('.remove-burger');
  
  // // Set up the event listeners for each delete button
  // deleteBurgerBtns.forEach((button) => {
  //   button.addEventListener('click', (e) => {
  //     const id = e.target.getAttribute('data-id');

  //     // Send the delete request
  //     fetch(`/api/burgers/${id}`, {
  //       method: 'DELETE',
  //     }).then((res) => {
  //       console.log(res);
  //       console.log(`removed burger: ${id}`);

  //       // Reload the page
  //       location.reload();
  //     });
  //   });
  // });