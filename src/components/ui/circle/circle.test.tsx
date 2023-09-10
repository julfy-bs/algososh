import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe('Компонент <Circle /> рендерится без ошибок', () => {
  it('без буквы', () => {
    const button = renderer
      .create(<Circle />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с буквами', () => {
    const button = renderer
      .create(<Circle letter={ 'A' } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с head', () => {
    const button = renderer
      .create(<Circle head={ 'head' } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с react-элементом в head', () => {
    const button = renderer
      .create(<Circle head={ <Circle isSmall={ true } /> } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с tail', () => {
    const button = renderer
      .create(<Circle tail={ 'tail' } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с react-элементом в tail', () => {
    const button = renderer
      .create(<Circle tail={ <Circle isSmall={ true } /> } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с index', () => {
    const button = renderer
      .create(<Circle index={ 0 } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с пропсом isSmall ===  true', () => {
    const button = renderer
      .create(<Circle isSmall={ true } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it(`в состоянии ${ ElementStates.Default }`, () => {
    const button = renderer
      .create(<Circle state={ ElementStates.Default } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it(`в состоянии ${ ElementStates.Changing }`, () => {
    const button = renderer
      .create(<Circle state={ ElementStates.Changing } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it(`в состоянии ${ ElementStates.Modified }`, () => {
    const button = renderer
      .create(<Circle state={ ElementStates.Modified } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
});
