	const shareUrl= "http://www.currys.co.uk/gbuk/household-appliances/small-kitchen-appliances/food-and-drink-preparation/juicers-and-blenders/nutri-ninja-duo-bl642uk-blender-black-silver-10148566-pdt.html";
	
	const settings = {};
	
	<div>
		<ShareLink
			settings={settings} service="facebook" shareUrl={shareUrl} />
		<ShareLink
			settings={settings} service="twitter" shareUrl={shareUrl} />
		<ShareLink
			settings={settings} service="googlePlus" shareUrl={shareUrl} />
		<ShareLink
			settings={settings} service="pinterest" shareUrl={shareUrl} />
		<ShareLink
			settings={settings} service="hotDealsUK" shareUrl={shareUrl} />
		<ShareLink
			settings={settings} service="mail" shareUrl={shareUrl} />
	</div>
