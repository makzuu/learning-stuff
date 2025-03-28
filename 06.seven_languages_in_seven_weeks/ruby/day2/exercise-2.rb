# The Tree class was interesting, but it did not allow you to specify a new
# tree with a clean user interface. Let the initializer accept a nested 
# structure of hashes.
# You should be able to specify a tree like this:
# { 'grandpa' => { 'dad' => { 'child 1' => {}, 'child 2' => {} }, 'uncle' =>
# { 'child 3' => {}, 'child 4' => {} } } }

class Tree
  attr_accessor :children, :node_name

  def initialize tree={}
    # todo:
  end

  def visit_all &block
    visit &block
    children.each {|c| c.visit_all &block}
  end

  def visit &block
    block.call self
  end

end

tree = Tree.new({ 'grandpa' => { 'dad' => { 'child 1' => {}, 'child 2' => {} },
                                 'uncle' => { 'child 3' => {}, 'child 4' => {}
                                 } } })

puts 'visiting a node'
tree.visit {|node| puts node.node_name}

puts

puts 'visiting entire tree'
tree.visit_all {|node| puts node.node_name}
