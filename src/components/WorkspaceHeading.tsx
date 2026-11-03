import { Icon, type IconName } from './Icon'

type WorkspaceHeadingProps = {
  titleId: string
  title: string
  eyebrow: string
  description: string
  icon: IconName
  onBack: () => void
}

export function WorkspaceHeading({
  titleId,
  title,
  eyebrow,
  description,
  icon,
  onBack,
}: WorkspaceHeadingProps) {
  return (
    <header className="workspace-heading">
      <span aria-hidden="true" className="workspace-heading__art">
        <Icon name={icon} size={26} />
      </span>
      <div className="workspace-heading__copy">
        <div className="workspace-heading__title">
          <h1 id={titleId}>{title}</h1>
          <p className="eyebrow">{eyebrow}</p>
        </div>
        <p className="workspace-heading__description">{description}</p>
      </div>
      <button className="back-link" onClick={onBack} type="button">
        <span aria-hidden="true">←</span>
        All tools
      </button>
    </header>
  )
}
