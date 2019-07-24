const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: '200px',
  },
  button: {
    margin: '0px 5px',
  },
  clearButton: {
    backgroundColor: '#AA4139',
    '&:hover': {
      backgroundColor: '#D4726A',
    },
    margin: '0px 5px',
  },
  icon: {
    margin: '0px 5px',
  },
  fieldsGrid: {
    display: 'grid',
    gridColumnGap: '40px',
    gridTemplateColumns: '200px 220px',
  },
  errorLabel: {
    color: 'red',
  },
  photoContainer: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '35px',
  },
  paperRoot: {
    width: '200px',
    height: '200px',
  },
  noPhotoPlaceHolder: {
    fontFamily: 'Roboto sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  formContainer: {
    display: 'flex',
  },
  photoUpload: {
    display: 'none',
  },
  photoIcon: {
    color: '#3ac182',
  },
};

export default styles;
