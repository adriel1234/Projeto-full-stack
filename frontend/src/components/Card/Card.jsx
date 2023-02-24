import "./Card.css"
function Card(props){

    const item = props.item;
	const tags = item.tags;
    return( 
    <div className="card">
		<h1>{item.nome}</h1>
		
		
		{/*Renderização condicional do elemento tags*/}
	{tags && (
        <div className="tag-wrapper">
			{tags.map(function(tag,index){
				return <div key={`tag-${index}`} className="tag">{tag} </div>
			})}
			
			
		</div>
	)}
		
        <img src={item.imagemUrl} alt="" />
			
    </div>
    )
}

export default Card;