const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '200px',
  },
  button: {
    margin: theme.spacing.unit,
  },
  clearButton: {
    backgroundColor: '#AA4139',
    '&:hover': {
      backgroundColor: '#D4726A',
    },
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  fieldsGrid: {
    display: 'grid',
    gridColumnGap: '40px',
    gridTemplateColumns: '200px 200px',
  },
  errorLabel: {
    color: 'red',
  },
});

export default styles;
