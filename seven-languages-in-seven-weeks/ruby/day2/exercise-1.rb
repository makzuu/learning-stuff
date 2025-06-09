# Print the contents of an array of sixteen numbers, four numbers at a time,
# using just each. Now, do the same with each_slice in Enumerable.

a = (1..16).to_a

c = 0

a.each do |e|
  if c < 4
    printf '%d ', e
    c = c + 1
  else
    printf "\n%d ", e
    c = 1
  end

end

printf "\n---\n"

require 'enumerator'

a.each_slice(4) do |e|
  e.each { |ee| print "#{ee} " }
  puts
end
