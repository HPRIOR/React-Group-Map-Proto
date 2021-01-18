
const PostCodeInputField = ({locations, postCode, handleInputChange, addButtonCallBack, removeButtonCallBack }) => {

    return(
        <div>
            <ul >
                {locations.map(i => (
                    <li key={i.id}> {i.postcode}<button type="button" onClick={() => removeButtonCallBack(i.id)}>remove</button></li>
                ))}
            </ul>
            <input type="text" value={postCode} onChange={handleInputChange}></input>
            <button type="button" onClick={addButtonCallBack}>add</button>
        </div>
    )

}

export default PostCodeInputField;