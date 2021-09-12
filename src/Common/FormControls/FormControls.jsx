import './FormControls.css'

export const Input = ({ input, meta, ...props }) => {
  const hasError = meta.touched && meta.error;
  return <div>
    <input {...input} {...props} />
    <br></br>
    {hasError && <span className="form-error-message">{ meta.error}</span>}
    </div>
}
