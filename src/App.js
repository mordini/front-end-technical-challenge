import './App.css';
import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

console.clear();

// simple function to help check types for debugging
const toType = function (obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};

const CheckboxFormGroup = () => {
  // Given data to be used
  const values = {
    '01bbb998-af3d-47a4-b0ff-e67d033d80e9': 'Luz Ballard',
    '01021494-f157-4183-964c-6b0ddc964ab8': 'Corey Johnson',
    '97a2daa4-406b-4b1c-831e-bdfd90b224f2': 'Andrew Torres',
    '6256ba85-b59f-40b9-8715-406cc54d7f05': 'Nichole Wilson',
    '5c0c746c-ec56-4fb7-8b32-066b64d70611': 'Nancy Hall',
    'c103b480-8efb-450f-9141-6a8037de2348': 'Agnes Lorenzen',
    '4e0cc3dc-fce9-45d9-85c7-a3ae5cb0ce57': 'Donald Hyde',
    'f80af139-5c68-4475-8cb6-ced7e38c6f43': 'Dennis Fuller',
    '5073359e-b228-4852-b1a3-3f2edfc8672f': 'Francis Hodgkins',
    '9c9a3cc8-044e-43d0-87ff-58a6b44eca53': 'David McLain',
  };

  // Create array of objects with properties for easier processing of given data
  const newValuesArray = [];
  for (let key in values) {
    newValuesArray.push({
      id: key,
      name: values[key],
    });
  }

  const [checked, setChecked] = useState(true);
  const [idArray, setIdArray] = useState([]);
  const [isHighlighted, setHighlighted] = useState('');

  // making sure state is really using an array
  let typeOf = toType(idArray);
  console.log(typeOf);

  // Fulfills specification to store selected values in an array of ids ONLY
  // this is a confusing spec.  do we store the selected value, or the id?
  // I would ask client for clarification during discovery process

  // handler to add the items from the id list
  const AddItemHandler = (props) => {
    console.log('add');
    console.log(props.target.id);
    const id = props.target.id;
    console.log(props.target);

    setHighlighted('red');
    setIdArray((idArray) => [...idArray, id]);
  };

  // handler to remove the items from the id list
  const RemoveItemHandler = (props) => {
    console.log('remove');
    const id = props.target.id;
    const filteredArray = idArray.filter((x) => x !== id);
    setIdArray(filteredArray);
    setHighlighted('');
  };

  const storeCheckedIds = (props) => {
    console.clear();
    const id = props.target.id;
    if (!idArray.includes(id) && props.target.checked) {
      AddItemHandler(props);
    } else if (idArray.includes(id) && !props.target.checked) {
      RemoveItemHandler(props);
    }
    console.log(idArray); // just to show in console
    return idArray;
  };

  const changeHandler = (event) => {
    console.log('handle event');

    setChecked(event.target.checked);
    storeCheckedIds(event);
  };

  // TO FULFILL HIGHLIGHTING SECTION
  // SEND BACK DYNAMIC CHECKBOXES BASED ON DATA
  return (
    <div className='col-centered'>
      <FormGroup>
        {newValuesArray.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.isChecked}
                onChange={changeHandler}
                name={item.name.split(' ')[0].toLowerCase()}
                id={item.id}
                color='primary'
              />
            }
            label={item.name}
            //{
            //   <div style={{ color: (item.color = isHighlighted) }}>
            //     {item.name}
            //   </div>
            // }
            labelPlacement='end'
            key={item.id}
          />
        ))}
        <pre className='selectedIds'>{idArray.join('\r\n')}</pre>
      </FormGroup>
    </div>
  );
};

function App() {
  return <CheckboxFormGroup />;
}

export default App;
