    const Tooltip = require('../../molecules/Tooltip/Tooltip').default;
    const Icon = require('../../molecules/Icon/Icon').default;
     
    <div className="dc-site-currys" style={{ maxWidth: '150px', paddingBottom: '50px' }}>
        <Flip>
            {({ flipToFront, flipToBack }) => {
                return {
                    front: <Tooltip textAlign="center" type="info">
                        <a className="dc-link" onClick={flipToBack}>
                            Flip to back <Icon icon="ChevronRight" />
                        </a>
                    </Tooltip>,
                    back: <Tooltip textAlign="center" type="positive">
                        <a className="dc-link" onClick={flipToFront}>
                            Flip to front <Icon icon="Flip" />
                        </a>
                    </Tooltip>
                };
            }}
        </Flip>
    </div>
    