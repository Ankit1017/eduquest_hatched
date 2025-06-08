// PerformanceAnalysisManager/PerformanceAnalysisStyles.js
export const styles = {
  headerContainer: {
    position: 'relative',
    marginBottom: '32px'
  },
  homePageContainer: {
    padding: '0px 24px',
    color: '#f0f0f0',
    minHeight: '95vh',
    overflow: 'hidden',
  },
  title: (theme) => ({
    color: theme.accent,
    textAlign: 'center',
    margin: '30px 0 18px 0',
    fontWeight: 700,
    fontSize: '2rem'
  }),
  sortSelect: (theme) => ({
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '6px 12px',
    borderRadius: '6px',
    border: `1px solid ${theme.accent}`,
    background: theme.cardBackground,
    color: theme.textPrimary,
    fontWeight: 500,
    cursor: 'pointer'
  }),
  sliderContainer: {
    maxWidth: '1100px',
    margin: '0 auto 32px auto',
    paddingBottom: 12
  },
  card: (theme) => ({
    background: theme.cardBackground,
    borderRadius: '14px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
    padding: '22px 18px 18px 18px',
    margin: '10px',
    width: '320px',
    minHeight: '380px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: theme.border,
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 6px 32px ${theme.accent}20`
    }
  }),
  label: (theme) => ({
    fontWeight: 600,
    color: theme.textSecondary,
    marginTop: 12
  }),
  value: (theme) => ({
    fontWeight: 500,
    color: theme.textPrimary,
    marginBottom: 8
  }),
  sliderSettings: {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    adaptiveHeight: true,
    swipe: true,
    draggable: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 700, settings: { slidesToShow: 1 } }
    ]
  }
};
