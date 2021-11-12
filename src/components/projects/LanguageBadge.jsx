
export default function LanguageBadges(props) {
	function generateBadge(lang) {
		return <span className="languageBadge">{lang}</span>
	}
	return <div className="languageBadgeContainer">
		{props.langs.map(generateBadge)}
	</div>


}