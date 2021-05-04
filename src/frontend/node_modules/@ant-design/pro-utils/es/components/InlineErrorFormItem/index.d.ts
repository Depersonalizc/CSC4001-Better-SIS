import type { FormItemProps, PopoverProps, ProgressProps } from 'antd';
interface InlineErrorFormItemProps extends FormItemProps {
    errorType?: 'popover' | 'default';
    popoverProps?: PopoverProps;
    progressProps?: ProgressProps | false;
}
declare const _default: (props: InlineErrorFormItemProps) => JSX.Element;
export default _default;
