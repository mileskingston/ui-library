    var Step = require('../../molecules/Step/Step').default;
    
    <div>
        <h3>Vertical steps (default):</h3>
        <Steps>
            <Step isActive>
                Click the ‘Save for later’ button on our product pages.
            </Step>
            <Step isActive>
                If you’re not signed in, sign in or create a quick account.
            </Step>
            <Step isActive>
                Review and purchase saved items from inside your account.
            </Step>
        </Steps>
        
        <br />
        
        <h3>Horizontal steps:</h3>
        <Steps isHorizontal>
            <Step isActive>
                Click the ‘Save for later’ button on our product pages.
            </Step>
            <Step isActive>
                If you’re not signed in, sign in or create a quick account.
            </Step>
            <Step isActive>
                Review and purchase saved items from inside your account.
            </Step>
        </Steps>
        
        <br />
        
        <h3>Steps with progress:</h3>
        <Steps currentStep={3}>
            <Step>
                Items in your basket
            </Step>
            <Step>
                Choose a store to collect from
            </Step>
            <Step>
                Your details
            </Step>
            <Step>
                Payment
            </Step>
            <Step>
                Confirmation
            </Step>
        </Steps>
    </div>