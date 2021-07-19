import React from 'react';

const SimpleInput = (props) => (
  <form>
    <div className="form-control">
      <label htmlFor="name">Your Name</label>
      <input type="text" id="name" />
    </div>
    <div className="form-actions">
      <button type="button">Submit</button>
    </div>
  </form>
);

export default SimpleInput;
