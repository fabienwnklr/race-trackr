import './styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button, ColorPicker, Dropdown, Flex } from 'antd'
import {
  BoldOutlined,
  DownOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  RedoOutlined,
  StrikethroughOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { ParagraphIcon } from '#components/icons/paragraphe'
import H1Icon from '#components/icons/h1'
import H2Icon from '#components/icons/h2'
import CodeBlockIcon from '#components/icons/code_block'
import BlockquoteIcon from '#components/icons/blockquote'
import HrIcon from '#components/icons/hr'
import { HardBreakIcon } from '#components/icons/hard_break'

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const selectedHeadingLevel = []

  if (!editor) {
    return null
  }

  if (editor.isActive('heading', { level: 1 })) {
    selectedHeadingLevel.push('heading1')
  } else if (editor.isActive('heading', { level: 2 })) {
    selectedHeadingLevel.push('heading2')
  } else if (editor.isActive('heading', { level: 3 })) {
    selectedHeadingLevel.push('heading3')
  } else if (editor.isActive('heading', { level: 4 })) {
    selectedHeadingLevel.push('heading4')
  }

  return (
    <Flex className="control-group">
      <Flex className="toolbar" wrap flex={'100%'} gap="0.25rem">
        <Button
          type="text"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <UndoOutlined />
        </Button>
        <Button
          type="text"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <RedoOutlined />
        </Button>

        <Button
          type="text"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <BoldOutlined />
        </Button>
        <Button
          type="text"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <ItalicOutlined />
        </Button>
        <Button
          type="text"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <StrikethroughOutlined />
        </Button>
        <Button
          type="text"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <ParagraphIcon size={16} />
        </Button>
        <Dropdown
          trigger={['click']}
          menu={{
            selectedKeys: selectedHeadingLevel,
            items: [
              {
                key: 'heading1',
                label: 'Heading 1',
                style: { fontSize: '1.4rem' },
                onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
              },
              {
                key: 'heading2',
                label: 'Heading 2',
                style: { fontSize: '1.2rem' },
                onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
              },
              {
                key: 'heading3',
                label: 'Heading 3',
                style: { fontSize: '1.1rem' },
                onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
              },
              {
                key: 'heading4',
                label: 'Heading 4',
                style: { fontSize: '1rem' },
                onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
              },
            ],
          }}
        >
          <Button type="text">
            Heading
            <DownOutlined />
          </Button>
        </Dropdown>
        <Button
          type="text"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <UnorderedListOutlined />
        </Button>
        <Button
          type="text"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <OrderedListOutlined />
        </Button>
        <Button
          type="text"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          <BlockquoteIcon />
        </Button>
        <Button type="text" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <HrIcon />
        </Button>
        <Button type="text" onClick={() => editor.chain().focus().setHardBreak().run()}>
          <HardBreakIcon />
        </Button>
        <ColorPicker
          value={editor.getAttributes('textStyle').color || '#000000'}
          onChange={(color) => editor.chain().focus().setColor(color.toHexString()).run()}
        />
      </Flex>
    </Flex>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]

export default function TextEditor(props: { content: string }) {
  const { content } = props
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      immediatelyRender={false}
    ></EditorProvider>
  )
}
