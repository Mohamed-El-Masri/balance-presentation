import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-border" role="status">
        <span className="sr-only">جاري التحميل...</span>
      </div>
    </div>
  );
};

export default Spinner;
