
export default function TextBox(props) {
    return <>
    <label><i>{props.text}: </i></label>
    <input 
        onChange={(e) => props.change(e.target.value)} 
    type="text"></input> 
    </>
}