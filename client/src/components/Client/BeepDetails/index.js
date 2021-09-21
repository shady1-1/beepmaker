

const BeepDetails = ({ beep }) => {
	const greenStyle={
		background:"green",

	}
	return (


		<div className="beep-details">

			<div className="beep-generated" style={ ( beep.ready ) ?greenStyle : {}}>


				<div className="beep-img-container">
					<img src="../../../img/beep_logo.png" alt="loading..."/>
				</div>
				<div className="content">
					<div className="beep-head">
						<img src="../../../img/beep_badge.png" alt="loading..."/>
						<div className="badge-text">Code généré avec succès</div>
					</div>
					<div className="separation">
						<div className="circle-1"></div>
						<div className="circle-2"></div>
					</div>
					<div className="beep-body">
						<div className="beep-body-title">Votre numéro est</div>
						<div className="beep-details-number">N°{beep.numero}</div>
						<div className="beep-body-generate-time beep-body-title">ce numéro a une duré de 3 heures</div>
						{beep.ready && <div className="beep-body-ready">Votre commande est prête</div>}



						<div className="beep-bottom-effect"></div>
					</div>
				</div>
			</div>
			</div>

	);

};

export default BeepDetails;