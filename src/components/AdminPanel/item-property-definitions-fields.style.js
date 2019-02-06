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
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  fieldsGrid: {
    display: 'grid',
    gridColumnGap: '40px',
    gridTemplateColumns: '200px 200px',
  },
});

export default styles;
