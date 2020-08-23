import React, { useState } from 'react';

const useForm = (initialFormState) => {
  const [form, setForm] = useState(initialFormState);
  return {
     form,
     setForm,
     reset: () => setForm(initialFormState),
     // works with text, radio, and select elements
     bind: (name, value) => ({
        name,
        value: value || form[name],
        onChange: (event) => {
           const { name, value } = event.target;
           setForm(Object.assign({}, form, { [name]: value }));
        }
     }),
     // works with checkboxes
     bindCheckbox: (name) => ({
        name,
        value: name,
        checked: form[name],
        onChange: (event) => {
           const { checked } = event.target;
           setForm(Object.assign({}, form, { [name]: checked }));
        }
     })
  };
};

function App() {

  const [firstName, setFirstName] = useState("");

  const { form, reset, bind } = useForm({
    firstName: '',
    lastName: '',
    city: ''
  });

  return (
    <div>
      Practice Form!
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log(form);
        // resets form
        reset();
      }}>
        <input placeholder="First Name" {...bind("firstName")} />
        <input placeholder="Last Name" {...bind("lastName")} />
        <input placeholder="City" {...bind("city")} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;