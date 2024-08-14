import Joyride from "react-joyride";

function Tutorial ({steps, startTutorial, onComplete}) {
    return (
        <Joyride
        steps={steps}
        run={startTutorial}
        continuous
        showProgress
        showSkipButton
        onComplete={onComplete}
        styles={{
          options: {
            zIndex: 10000,
            lineHeight: '1.6',
          },
          tooltip: {
            whiteSpace: 'pre-line', // 줄 바꿈을 허용
          },
        }}
      />
    )
}

export default Tutorial;