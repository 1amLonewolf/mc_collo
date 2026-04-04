import { cn, isValidEmail, formatDate, scrollToElement } from '@/lib/utils';

describe('cn', () => {
  it('merges Tailwind classes correctly', () => {
    const result = cn('px-4 py-2', 'px-6');
    expect(result).toBe('py-2 px-6');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toBe('base-class active-class');
  });

  it('handles false/undefined/null values', () => {
    const result = cn('class1', false && 'class2', null, undefined, 'class3');
    expect(result).toBe('class1 class3');
  });
});

describe('isValidEmail', () => {
  it('validates correct email formats', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.org')).toBe(true);
    expect(isValidEmail('user+tag@example.co.uk')).toBe(true);
  });

  it('rejects invalid email formats', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('invalid@')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
    expect(isValidEmail('user@domain')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('formatDate', () => {
  it('formats date strings correctly', () => {
    const result = formatDate('2026-03-28');
    expect(result).toBe('March 28, 2026');
  });

  it('formats Date objects', () => {
    const date = new Date(2026, 0, 1);
    const result = formatDate(date);
    expect(result).toBe('January 1, 2026');
  });
});

describe('scrollToElement', () => {
  beforeEach(() => {
    // Mock document.getElementById
    document.getElementById = jest.fn();
    Element.prototype.scrollIntoView = jest.fn();
  });

  it('scrolls to element if it exists', () => {
    const mockElement = { scrollIntoView: jest.fn() };
    (document.getElementById as jest.Mock).mockReturnValue(mockElement);

    scrollToElement('test-id');

    expect(document.getElementById).toHaveBeenCalledWith('test-id');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('does nothing if element does not exist', () => {
    (document.getElementById as jest.Mock).mockReturnValue(null);

    scrollToElement('nonexistent');

    expect(document.getElementById).toHaveBeenCalledWith('nonexistent');
  });
});
