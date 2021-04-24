import { renderHook, act } from '@testing-library/react-hooks';
import usePagination from '../index';

describe('usePagination tests', () => {
  const items = [{ id: 0, name: "Nelson"}, { id: 1, name: "Vivian"}]

  it('should be defined', () => {
    expect(usePagination).toBeDefined();
  });

  it('renders the hook correctly and checks types', () => {
    const { result } = renderHook(() => usePagination({ items, size: 1 }));
    expect(result.current.current).toBe(1);
    expect(typeof result.current.current).toBe('number');
    expect(typeof result.current.next).toBe('function');
  });

  it('should go to the next page', () => {
    const { result } = renderHook(() => usePagination({ items, size: 1 }));
    act(() => {
      result.current.next();
    });
    expect(result.current.current).toBe(2);
  });
});
