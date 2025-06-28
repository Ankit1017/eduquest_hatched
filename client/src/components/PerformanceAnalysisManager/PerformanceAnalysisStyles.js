export const styles = {
  headerContainer: (isMobile) => ({
    position: 'relative',
    marginBottom: isMobile ? '20px' : '32px',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: isMobile ? 'center' : 'space-between',
    gap: isMobile ? '16px' : '0',
  }),
  
  homePageContainer: (isMobile) => ({
    padding: isMobile ? '16px 12px' : '24px',
    color: '#f0f0f0',
    minHeight: '95vh',
    overflow: 'hidden',
  }),
  
  title: (theme, isMobile) => ({
    color: theme.accent,
    textAlign: 'center',
    margin: isMobile ? '16px 0 8px 0' : '30px 0 18px 0',
    fontWeight: 700,
    fontSize: isMobile ? '1.5rem' : '2rem',
  }),
  
  sortSelect: (theme, isMobile) => ({
    position: isMobile ? 'static' : 'absolute',
    right: isMobile ? 'auto' : '20px',
    top: isMobile ? 'auto' : '50%',
    transform: isMobile ? 'none' : 'translateY(-50%)',
    padding: isMobile ? '10px 16px' : '8px 12px',
    borderRadius: '8px',
    border: `1px solid ${theme.accent}`,
    background: theme.cardBackground,
    color: theme.textPrimary,
    fontWeight: 500,
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: isMobile ? '220px' : 'auto',
    outline: 'none',
  }),
  
  sliderContainer: (isMobile) => ({
    maxWidth: isMobile ? '100%' : '1200px',
    margin: isMobile ? '0 auto 16px auto' : '0 auto 32px auto',
    paddingBottom: isMobile ? '16px' : '20px',
  }),
  
  card: (theme, isMobile) => ({
    background: theme.cardBackground,
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
    padding: isMobile ? '12px 6px 10px 6px' : '22px 18px 18px 18px',
    margin: '0 auto 16px auto',
    width: isMobile ? '80%' : '320px',
    maxWidth: isMobile ? '250px' : '340px',
    minHeight: isMobile ? '200px' : '380px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: theme.border,
    fontSize: isMobile ? '10px' : '10px',
  }),

  
  label: (theme, isMobile) => ({
    fontWeight: 600,
    color: theme.textSecondary,
    marginTop: isMobile ? '8px' : '12px',
    fontSize: isMobile ? '13px' : '14px',
    textAlign: 'center',
  }),
  
  value: (theme, isMobile) => ({
    fontWeight: 500,
    color: theme.textPrimary,
    marginBottom: isMobile ? '4px' : '8px',
    fontSize: isMobile ? '15px' : '16px',
    textAlign: 'center',
  }),
  
  // Base slider settings - no reference to sortedTopics
  sliderSettings: {
    dots: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    swipe: true,
    draggable: true,
    touchThreshold: 8,
    swipeToSlide: true,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '5px',
          speed: 400,
          centerMode: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
          centerMode: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 9999,
        settings: {
          slidesToShow: 3,
          centerMode: false
        }
      }
    ]
  }
};
